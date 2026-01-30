import React, { useEffect, useState } from "react";
import "../../../src/style.css";
import CallIcon from "@mui/icons-material/Call";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallEndIcon from "@mui/icons-material/CallEnd";
import DialpadIcon from "@mui/icons-material/Dialpad";
import ExtensionIcon from "@mui/icons-material/Extension";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import socketIOClient from "socket.io-client";
import {
  Box,
  Chip,
  Grid,
  Card,
  Typography,
  Skeleton,
  styled,
  IconButton,
} from "@mui/material";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { AccessTime, CallMade } from "@mui/icons-material";
import axios from "axios";
import { api } from "../../mockData";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const formatBillTime = (str) => {
  if (!str) return "0h 0m 0s";

  const parts = str.match(/\d+/g);
  if (!parts) return "0h 0m 0s";

  const [h = 0, m = 0, s = 0] = parts.map(Number);
  const d = dayjs.duration(h * 3600 + m * 60 + s, "seconds");

  return `${Math.floor(d.hours())}h ${d.minutes()}m`;
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[400],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#254336",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

function Dashboard() {
  const current_user = localStorage.getItem("current_user");
  const user = JSON.parse(localStorage.getItem(`user_${current_user}`));
  const [callSummary, setCallSummary] = useState({});
  const [loader, setLoader] = useState(true); // ✅ default true
  const [visibleCount, setVisibleCount] = React.useState(3);
  // const [visibleCount1, setVisibleCount1] = React.useState(5);
  const [liveExtension, setLiveExtension] = useState("");
  const [dataVal, setDataVal] = useState([]);
  const [didProg, setDidProg] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(`${api.dev}`);

    // Listen for events from the server
    socket.on("extension_status", (data) => {
      // Handle the received data (e.g., update state, trigger a re-fetch)
      if (data?.data !== undefined) {
        // const jsonData = JSON.parse(data?.data);
        // console.log('jsonData', jsonData)
        setLiveExtension(data?.data);
      }
    });

    return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
    // dispatch(getReport());
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  const handleLoadLess = () => {
    setVisibleCount((prev) => Math.max(prev - 2, 3)); // minimum 3 items
  };

  const callStats = [
    {
      title: "Total Calls",
      value: callSummary?.data?.Total ?? 0,
      subValue: "Today",
      icon: CallIcon,
      accent: "#4f46e5", // royal indigo
    },
    {
      title: "Inbound Calls",
      value: callSummary?.data?.Inbound ?? 0,
      subValue: "Successful",
      icon: CallReceivedIcon,
      accent: "#22c55e", // fresh green
    },
    {
      title: "Outbound Calls",
      value: callSummary?.data?.Outbound ?? 0,
      subValue: "Needs attention",
      icon: CallMade,
      accent: "#38bdf8", // sky blue
    },
    {
      title: "Answered Calls",
      value: callSummary?.data?.Answered ?? 0,
      subValue: "Handled",
      icon: CallEndIcon,
      accent: "#10b981", // emerald
    },
    {
      title: "Missed Calls",
      value: callSummary?.data?.Missed ?? 0,
      subValue: "Needs attention",
      icon: CallMissedIcon,
      accent: "#f97316", // warm orange
    },
    {
      title: "Failed Calls",
      value: callSummary?.data?.Failed ?? 0,
      subValue: "Errors",
      icon: CallEndIcon,
      accent: "#ef4444", // modern red
    },
    {
      title: "Active DID Number",
      value: callSummary?.data?.total_active_didnumber ?? 0,
      subValue: "Live",
      icon: DialpadIcon,
      accent: "#06b6d4", // aqua cyan
    },
    {
      title: "Total Extention",
      value: callSummary?.data?.Extension ?? 0,
      subValue: "Configured",
      icon: ExtensionIcon,
      accent: "#8b5cf6", // soft violet
    },
    {
      title: "Live Extention",
      value:
        liveExtension &&
        liveExtension?.filter((item) => item[4] === user?.uid).length,
      subValue: "Online",
      icon: WifiCalling3Icon,
      accent: "#880681", // strong green
    },

    {
      title: "Total Hours",
      value: formatBillTime(callSummary?.data?.total_billsec_hms),
      subValue: "Online",
      icon: AccessTime,
      accent: "#01a574", // strong green
    },
  ];

  const StatCard = ({ title, value, icon: Icon, accent }) => {
    return (
      <Card
        sx={{
          p: 2.5,
          borderRadius: "20px",
          backgroundColor: "#fff",
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 8px 32px ${accent}22`,
          border: `1px solid ${accent}22`,
          transition: "all 0.35s ease",
          cursor: "pointer",

          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: `0 20px 40px ${accent}33`,
          },

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            backgroundColor: accent,
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Left Content */}
          <Box zIndex={1}>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: accent,
                mb: 0.5,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.9rem",
                fontWeight: 700,
                color: "#1f2937",
              }}
            >
              {value}
            </Typography>
          </Box>

          {/* Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "18px",
              backgroundColor: `${accent}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${accent}30`,
            }}
          >
            <Icon sx={{ fontSize: 30, color: accent }} />
          </Box>
        </Box>
      </Card>
    );
  };

  const StatCardSkeleton = () => {
    return (
      <Card
        sx={{
          p: 2.5,
          borderRadius: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Skeleton width={120} height={18} />
            <Skeleton width={80} height={40} sx={{ mt: 1 }} />
          </Box>

          <Skeleton variant="rounded" width={64} height={64} />
        </Box>
      </Card>
    );
  };

  useEffect(() => {
    let isMounted = true; // 🔒 prevent state update after unmount

    const fetchData = async () => {
      setLoader(true); // ✅ show loader

      try {
        const config2 = {
          method: "get",
          url: `${api.dev}/api/calls_summary`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        };

        const config3 = {
          method: "get",
          url: `${api.dev}/api/recentreport`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        };

        const config4 = {
          method: "get",
          url: `${api.dev}/api/did_progress_bar`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        };

        const results = await Promise.allSettled([
          axios.request(config2),
          axios.request(config3),
          axios.request(config4),
        ]);

        const [callSummaryRes, recentReportRes, did_progress_barRes] = results;

        if (isMounted) {
          // ✅ calls summary
          if (callSummaryRes.status === "fulfilled") {
            setCallSummary(callSummaryRes.value.data);
          } else {
            console.error("Call Summary API failed", callSummaryRes.reason);
            setCallSummary(null);
          }

          // ✅ recent report
          if (recentReportRes.status === "fulfilled") {
            setDataVal(recentReportRes.value.data);
          } else {
            console.error("Recent Report API failed", recentReportRes.reason);
            setDataVal([]);
          }

          // did_progress_bar

          if (did_progress_barRes.status === "fulfilled") {
            setDidProg(did_progress_barRes.value.data);
          } else {
            console.error(
              "Did Progress bar API failed",
              did_progress_barRes.reason,
            );
            setDidProg([]);
          }
        }
      } catch (error) {
        console.error("Unexpected API Error:", error);
      } finally {
        if (isMounted) {
          setLoader(false); // ✅ hide loader safely
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // cleanup
    };
  }, [user?.access_token]);

  const CallPerformanceSkeleton = () => {
    return (
      <Box>
        {Array.from({ length: visibleCount }).map((_, index) => (
          <Box
            key={index}
            sx={{
              mb: 1,
              p: 1.4,
              borderRadius: 2,
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
            }}
          >
            {/* Header row skeleton */}
            <Box sx={{ display: "flex", gap: 2, mb: 0.8 }}>
              <Skeleton width={150} height={20} />
              <Skeleton width={100} height={20} />
            </Box>

            {/* Progress bar skeleton */}
            <Box sx={{ position: "relative" }}>
              <Skeleton
                variant="rounded"
                height={20}
                width="100%"
                sx={{ borderRadius: "2px" }}
              />

              {/* Percentage label skeleton */}
              <Skeleton
                width={40}
                height={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: 1,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  const TableSkeleton = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              {Array.from({ length: 4 }).map((_, i) => (
                <th key={i}>
                  <Skeleton width="80%" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 4 }).map((_, colIndex) => (
                  <td key={colIndex}>
                    <Skeleton />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const callPerformanceData1 = [
    {
      ext_number: "18773362192",
      calls: 1240,
      total_live_call: 340,
      percent: 82,
    },
    {
      ext_number: "18773362193",
      calls: 980,
      total_live_call: 230,
      percent: 74,
    },
    {
      ext_number: "18773362194",
      calls: 456,
      total_live_call: 236,
      percent: 36,
    },
    {
      ext_number: "18773362195",
      calls: 210,
      total_live_call: 876,
      percent: 24,
    },
    {
      ext_number: "18773362192",
      calls: 1240,
      total_live_call: 466,
      percent: 82,
    },
    {
      ext_number: "18773362193",
      calls: 980,
      total_live_call: 853,
      percent: 74,
    },
    {
      ext_number: "18773362194",
      calls: 456,
      total_live_call: 864,
      percent: 36,
    },
    {
      ext_number: "18773362195",
      calls: 210,
      total_live_call: 132,
      percent: 24,
    },
  ];

  return (
    <>
      <section className="sidebar-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="">
                {/* <!----> */}
                <div className="tab_cntnt_box"></div>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Box className="d-flex justify-content-between flex-wrap">
                      <Box>
                        <Chip
                          label="Call Summary"
                          sx={{
                            px: 2,
                            py: 1,
                            fontWeight: 600,
                            background:
                              "linear-gradient(135deg, #0e397f 0%, #0e397f 100%)",
                            color: "#fff",
                            fontSize: "0.85rem",
                            letterSpacing: 0.5,
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            px: 2,
                            py: 0.8,
                            borderRadius: "8px",
                            backgroundColor: "#1976d215",
                            color: "#0e397f",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            position: "relative",
                            overflow: "hidden",

                            // left accent bar
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                              width: "4px",
                              backgroundColor: "#1976d2",
                              borderRadius: "4px",
                            },

                            // shrink animation
                            animation: "shrinkPulse 2.8s ease-in-out infinite",

                            "@keyframes shrinkPulse": {
                              "0%": {
                                transform: "scale(1)",
                                opacity: 1,
                              },
                              "50%": {
                                transform: "scale(0.97)",
                                opacity: 0.85,
                              },
                              "100%": {
                                transform: "scale(1)",
                                opacity: 1,
                              },
                            },
                          }}
                        >
                          Note: Refresh Time 00:00 am to 11:59 pm.
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      {loader
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <Box
                              key={index}
                              sx={{
                                flex: "1 1 calc(20% - 10px)",
                                minWidth: 220,
                              }}
                            >
                              <StatCardSkeleton />
                            </Box>
                          ))
                        : callStats.map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                flex: "0 0 calc(20% - 10px)", // 👈 IMPORTANT CHANGE
                                maxWidth: "calc(20% - 10px)", // 👈 keeps width same
                                minWidth: 220,
                              }}
                            >
                              <StatCard {...item} />
                            </Box>
                          ))}
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Grid item xs={12} md={6} className="mt-4">
                      <Chip
                        label="DID Performance"
                        sx={{
                          mb: 2,
                          px: 2,
                          py: 1,
                          fontWeight: 600,
                          background: "#0e397f",
                          color: "#fff",
                          fontSize: "0.85rem",
                          letterSpacing: 0.5,
                        }}
                      />
                    </Grid>

                    {loader ? (
                      <CallPerformanceSkeleton />
                    ) : didProg?.data?.length > 0 ? (
                      didProg?.data
                        .slice(0, visibleCount)
                        .map((item, index) => {
                          const percent = Math.round(item.percent);

                          return (
                            <Box
                              key={index}
                              sx={{
                                mb: 1,
                                p: 1.4,
                                borderRadius: 2,
                                background: "#f8fafc",
                                border: "1px solid #e5e7eb",
                                transition: "0.25s",
                                "&:hover": {
                                  background: "#f1f5f9",
                                  transform: "translateY(-2px)",
                                },
                              }}
                            >
                              {/* Header row */}
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                  mb: 0.8,
                                }}
                              >
                                <Typography fontWeight={700} fontSize="13px">
                                  DID Number: {item.did_number}
                                </Typography>
                                <Typography fontWeight={700} fontSize="13px">
                                  Total Calls: <b>{item.calls}</b>
                                </Typography>
                                <Typography fontWeight={700} fontSize="13px">
                                  Inbound Calls: {item.inbound_calls}
                                </Typography>
                                <Typography fontWeight={700} fontSize="13px">
                                  Outbound Calls: {item.outbound_calls}
                                </Typography>
                                <Typography fontWeight={700} fontSize="13px">
                                  Total Hours: <b>{item.total_hours}</b>
                                </Typography>
                              </Box>

                              {/* Progress bar */}
                              <Box sx={{ position: "relative" }}>
                                <BorderLinearProgress
                                  variant="determinate"
                                  value={percent}
                                  sx={{
                                    height: 20,
                                    borderRadius: "2px",
                                    backgroundColor: "#e5e7eb",
                                    "& .MuiLinearProgress-bar": {
                                      borderRadius: "2px",
                                      background:
                                        percent >= 50
                                          ? "linear-gradient(90deg, #16a34a, #22c55e)"
                                          : "linear-gradient(90deg, #dc2626, #ef4444)",

                                      boxShadow:
                                        percent >= 70
                                          ? "0 0 10px rgba(34,197,94,0.6)"
                                          : percent >= 40
                                            ? "0 0 8px rgba(249,115,22,0.5)"
                                            : "0 0 8px rgba(239,68,68,0.6)",

                                      animation:
                                        percent >= 70
                                          ? "pulseWarn1 1.4s infinite"
                                          : "pulseWarn 1.6s infinite",
                                    },
                                  }}
                                />

                                {/* Percentage label */}
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: `clamp(1%, ${percent}%, 92%)`,
                                    transform: "translate(-50%, -50%)",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    px: 1,
                                    borderRadius: 1,
                                    color: percent > 50 ? "#065f46" : "#92400e",
                                    background:
                                      percent > 50 ? "#ecfdf5" : "#fffbeb",
                                    animation:
                                      percent > 50
                                        ? "pulseWarn1 1.3s infinite"
                                        : "pulseWarn 1.6s infinite",
                                  }}
                                >
                                  {percent}%
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })
                    ) : (
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 3,
                          color: "text.secondary",
                          border: "1px dashed #e5e7eb",
                          borderRadius: 2,
                          backgroundColor: "#f9fafb",
                        }}
                      >
                        <Typography>
                          DID performance data not available
                        </Typography>
                      </Box>
                    )}

                    {!loader && callPerformanceData1.length > 3 && (
                      <Box
                        textAlign="center"
                        mt={2}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        {visibleCount > 3 && (
                          <IconButton
                            className="all_button_clr"
                            onClick={handleLoadLess}
                          >
                            Load Less
                          </IconButton>
                        )}

                        {visibleCount < didProg?.data?.length && (
                          <IconButton
                            className="all_button_clr"
                            onClick={handleLoadMore}
                            sx={{ background: "#333!important" }}
                          >
                            Load More
                          </IconButton>
                        )}
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Grid item xs={12} md={6} className="mt-4">
                      <Chip
                        label="Recent Report"
                        sx={{
                          mb: 2,
                          px: 2,
                          py: 1,
                          fontWeight: 600,
                          background: "#0e397f",
                          color: "#fff",
                          fontSize: "0.85rem",
                          letterSpacing: 0.5,
                        }}
                      />
                    </Grid>

                    {loader ? (
                      <TableSkeleton />
                    ) : (
                      <div className="table-responsive animated-table-wrapper">
                        <table className="table table-bordered table-hover animated-table">
                          <thead className="table-forwarding">
                            <tr>
                              <th>Caller ID</th>
                              <th>Forwarding No</th>
                              <th>Status</th>
                              <th>Call Start</th>
                            </tr>
                          </thead>

                          <tbody>
                            {loader ? (
                              <TableSkeleton />
                            ) : dataVal?.data?.records?.length > 0 ? (
                              dataVal?.data?.records.map((item, index) => (
                                <tr key={index} className="fade-row">
                                  <td>{item.src}</td>
                                  <td>{item.tfn_number}</td>

                                  <td>
                                    <span
                                      className={`${
                                        item.hangup_reason === "Connected"
                                          ? "success"
                                          : item.status === "Missed"
                                            ? "warning"
                                            : "error"
                                      }`}
                                    >
                                      {item.hangup_reason}
                                    </span>
                                  </td>

                                  <td>
                                    {dayjs(item.start_at).format(
                                      "DD/MM/YYYY HH:mm",
                                    )}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="text-center py-4 fw-semibold text-muted"
                                >
                                  No rows found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
