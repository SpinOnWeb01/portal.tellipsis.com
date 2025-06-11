import React from 'react'
import './home.css'
import './responsive.css'
import { useNavigate } from 'react-router-dom'
import NavbarComponent from './hdr'
function Homepage() {
    const navigate = useNavigate()
    const redirect = (e)=>{
        e.preventDefault()
        let data = "redirect"
       navigate("/login",{ state: { data: data } })
    }
    const manage = (e)=>{
        e.preventDefault()
        let data = "manage"
       navigate("/login",{ state: { data: data } })
    }
    const sip = (e)=>{
        e.preventDefault()
        let data = "sip"
       navigate("/login",{ state: { data: data } })
    }
  return (
   <>
    {/* <!--header-start--> */}
    {/* <header className="header-section">
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="/img/logo.png" className="img-fluid d-block" alt=""/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse menu menu-1" style={{top: "75px"}} id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nv-lnk">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Services
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Features
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Contact</a>
                        </li>
                    </ul>
                    <form className="d-flex mb-0 mb-lg-0 mx-lg-5 mb-md-3 mx-md-2 mx-2 mb-3 hvr-mbl-btn">
                        <div className="dropdownbtn">
                            <button className="dropdownbtn">Login <i className="fa-solid fa-caret-down"></i></button>
                            <div className="dropdownbtn-content">
                                <a href="/" onClick={redirect}> Redirecting</a>
                                <a href="/" onClick={manage}>Manage</a>
                                <a href="/" className="border-bottom-0" onClick={sip}>Sip</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    </header> */}
    <NavbarComponent/>
    {/* <!--header-end--> */}

    {/* <!--banner-start--> */}
    <section className="banner-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                    <div className="hoome-banner-caption">
                        <h2>We Believe to <br/>Connect with Customers</h2>
                        <p>The customer is everything to us!<br/> We provide the best way to associate with
                            customers.<br/>
                            No more calling or dropping in unwanted.<br/> We provide answers to tough
                            questions and <br/>our dedicated support team is always ready to<br/> serve you in any
                            situation.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--banner-end--> */}

    {/* <!-- category-start--> */}
    <section className="category-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-3 mt-3">
                    <div className="category-caption">
                        <div className="cagegory-box">
                            <div className="category-icon"><img src="/img/voip-telephone-1.webp"
                                    className="img-fluid d-block" alt="telephone"/></div>
                        </div>
                        <p>VOIP Telephony</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-3 mt-3">
                    <div className="category-caption">
                        <div className="cagegory-box">
                            <div className="category-icon"><img src="/img/call-solutions-1.webp"
                                    className="img-fluid d-block" alt="call solution"/></div>
                        </div>
                        <p>Call Solutions</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-3 mt-3">
                    <div className="category-caption">
                        <div className="cagegory-box">
                            <div className="category-icon"><img src="/img/toll-fee-number.webp"
                                    className="img-fluid d-block" alt="toll free number"/></div>
                        </div>
                        <p>Toll Free Number</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-3 mt-3">
                    <div className="category-caption">
                        <div className="cagegory-box">
                            <div className="category-icon"><img src="/img/support.webp" className="img-fluid d-block"
                                    alt="support"/></div>
                        </div>
                        <p>Support</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- category-end--> */}

    {/* <!--toll-free-number-start--> */}
    <section className="toll-free-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-7 col-md-7 col-12">
                    <div className="tollfree-caption">
                        <h3 className="title-txt">Toll Free Number</h3>
                        <hr className="title-bdr"/>
                        <p>Tellipsis has issued its official Toll Free Number service which comes with abundant
                            features which helps them to serve
                            the clients globally at their comfort. They have a toll free number with which the customers
                            can reach out to the executives
                            in case of any query or support. The executives of the company will provide the best of
                            their service to the customers with
                            the help of this toll free number. The customers can also connect to the executives through
                            this number in order to get the best solutions for their requirements.</p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-5 col-12">
                    <div className="toll-free-img">
                        <img src="/img/toll-free-img.webp" className="img-fluid d-block" alt="toll free number"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--toll-free-number-end--> */}

    {/* <!--call-center-solution-start--> */}
    <section className="call-center-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-4">
                    <div className="toll-free-img">
                        <img src="/img/call-center-solution-img.webp" className="img-fluid d-block"
                            alt="toll free number"/>
                    </div>
                </div>
                <div className="col-lg-7 col-md-7 col-12">
                    <div className="tollfree-caption ps-md-4 ps-lg-4 ps-sm-0n">
                        <h3 className="title-txt">Call Center Solutions</h3>
                        <hr className="title-bdr"/>
                        <p>Customers are at the heart of everything you do. The better you are at delivering the
                            best in customer service and ensuring seamless conversations with customers, the
                            greater the impact on your bottom line. That’s where Call Center Solutions come into
                            play. We can help you provide the right solutions for your call center, ensuring your
                            agents have the right tools and technology to provide a great experience to customers</p>
                        <p>We provide customized and cost-effective communication solutions to help you
                            make the best first impression with customers. Our experts can help you find the
                            right solution to meet your unique needs and get you set up quickly. We’ll also
                            help you maintain your solution so you can focus on other aspects of your business.
                            We’re here to help, so let’s find the solution that’s right for you.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--call-center-solution-start--> */}

    {/* <!--hosted-pbx-start--> */}
    <section className="toll-free-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-7 col-md-7 col-12">
                    <div className="tollfree-caption">
                        <h3 className="title-txt">Hosted PBX</h3>
                        <hr className="title-bdr"/>
                        <p>Simply experience the new, flexible Hosted PBX set known as Cloud PBX</p>
                        <p>The Hosted PBX is the next evolution of the cloud-based phone system.
                            This technology is the closest thing to an actual phone system without the hassle of
                            being physically located in the office. The Hosted PBX is a complete phone system
                            that is hosted by a provider in the cloud. This means that the services are accessible
                            online through a phone or internet browser, with no equipment required on your
                            end The traditional phone system is no longer the only option for your business
                            communication. Today, with the advent of the cloud technology, we can finally say
                            goodbye to the constant headache of the phone system. The hosted PBX service is a
                            great solution for the small and mid-sized businesses. It provides the same benefits
                            as the traditional phone system, but with the flexibility, reliability and affordability
                            of the cloud technology.</p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-5 col-12">
                    <div className="toll-free-img">
                        <img src="/img/hosted-pbx-img.webp" className="img-fluid d-block"
                            alt="toll free number"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--hosted-pbx-end--> */}

    {/* <!-- sip-trunking-start--> */}
    <section className="call-center-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-4">
                    <div className="toll-free-img ">
                        <img src="/img/sip-trunking-img.webp" className="img-fluid d-block"
                            alt="toll free number"/>
                    </div>
                </div>
                <div className="col-lg-7 col-md-7 col-12">
                    <div className="tollfree-caption ps-lg-4 ps-md-4 ps-sm-0">
                        <h3 className="title-txt">SIP Trunking</h3>
                        <hr className="title-bdr"/>
                        <p>We bring all the traits of SIP Trunking along with well-built controls which are user
                            friendly. We are an open source platform for building scalable and reliable SIP trunking
                            services. It has been designed with scalability, fault tolerance, and high availability
                            in mind. You can build your own SIP trunk service by combining our platform with your
                            favorite SIP stacks and third-party services. We also comes with a set of powerful and
                            easy to use APIs that makes it easy for you to add features to your service without
                            having to write a single line of code.</p>
                        <p>SIP trunking is the process of providing a private line between two locations.
                            Traditionally, this was done by connecting two analogue phones together with a device
                            called a Tandem. SIP Trunking uses the same technology, but now provides a private,
                            secure line between two locations, allowing for SIP based voice communications.
                            SIP trunking offers the ability to have a private line between two locations, with the
                            additional benefit of providing a secure line for business VoIP applications.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- sip-trunking-end--> */}

    {/* <!-- voip-telephony-start--> */}
    <section className="toll-free-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-7 col-md-7 col-12">
                    <div className="tollfree-caption">
                        <h3 className="title-txt">VOIP Telephony</h3>
                        <hr className="title-bdr"/>
                        <p>Follow advanced features especially for home based businesses to provide best quality.
                            The world has been moving towards the use of technology in almost every field of life.
                            Businesses are not an exception to this rule. With the advent of internet, it has become
                            very easy to operate a business from the comfort of one’s home. This has led to the rise
                            of many home businesses.</p>
                        <p>Using VoIP telephony services has become very common these days. The main
                            advantage of using VoIP is that it saves a lot of money, especially when you consider
                            how much it costs to maintain a traditional telephone system. You can also speak to
                            your customers or clients without having to worry about the time and money spent
                            traveling to their location, which can be both beneficial and necessary. This is why so
                            many people have gone ahead and invested in the latest VoIP telephony systems.
                            You can also Try!</p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-5 col-12">
                    <div className="toll-free-img">
                        <img src="/img/voip-telephony-img.webp" className="img-fluid d-block"
                            alt="toll free number"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--voip-telephony-end--> */}

    {/* <!--support-section-start--> */}
    <section className="support-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                    <div className="support-caption">
                        <h3 className="spprt-title text-white">VOIP Telephony</h3>
                        <div className="spprt-bdr">
                            <img src="/img/support-bdr-img.png" className="img-fluid d-block mx-auto"
                                alt="support border" />
                        </div>

                        <p>This company is committed to providing the best support to all customers. We at Tellipsis,
                            understand that customers' success is company success, which is why company strive to
                            provide the best support possible. When customers need support, Tellipsis is there to
                            provide the best support and assistance in regards to sales, installations, maintenance,
                            customization, and so forth. Tellipsis are committed to providing best support experience
                            possible. If you’re having trouble with anything related to Sales, Installation,
                            Maintenance, or Customization, customer service team is on standby to help. Customer team is
                            here to make sure you get the best assistance possible so you can continue to grow and
                            succeed. Dedicated sales and customer service agents are ready to answer any questions,
                            provide any assistance, and serve as a resource for you and your business. All it takes is a
                            simple chat or phone call to get the answers you need.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--support-section-end--> */}

    {/* <!--about-us-section-start--> */}
    <section className="toll-free-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-7 col-md-7 col-12">
                    <div className="tollfree-caption">
                        <h3 className="title-txt">About Us</h3>
                        <hr className="title-bdr"/>
                        <p>Tellipsis is a leading provider of telecommunication services. We offer a wide range
                            of telecommunication services including Hosted PBX and cloud hosted business phone
                            system. Our Hosted PBX and cloud hosted business phone system has all the traits of
                            traditional VoIP and cloud once installed; you will be in a position to bring changes on the
                            table. Our mission is to provide customers with the best telecommunication services at
                            an affordable price. Tellipsis is the best telecommunication service provider in USA
                            which offers wide range of business phone system to their customers to improve
                            productivity and minimize downtime.</p>
                        <p>We are one of the fastest growing technology companies in the industry. We have
                            worked on numerous large scale enterprise and government projects and we have the
                            experience and expertise to get the job done right. We have a proven record of
                            delivering high quality services to our customers and we are looking to expand our
                            offering to new verticals.</p>
                        <p>We are one of the leading cloud based services provider which provides a service to all
                            types of businesses not only these we also provides customized services as per the
                            requirement in order to provide best services. We ensure that training is provided to
                            all the engineers from time to time to keep them abreast with the latest technology.
                            We emphasize on providing best services to our clients and ensuring their 100%
                            satisfaction.</p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-5 col-12">
                    <div className="toll-free-img">
                        <img src="/img/about-section-image.webp" className="img-fluid d-block"
                            alt="toll free number"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--about-us-section-end--> */}

    {/* <!--calling-feature-section-start--> */}
    <section className="calling-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="calling-caption">
                        <h3 className="spprt-title text-black">Calling Features</h3>
                        <div className="spprt-bdr pb-3">
                            <img src="/img/calling-bdr.png" className="img-fluid d-block mx-auto"
                                alt="support border" />
                        </div>
                        <p>With Tellipsis call recording features, you can increase your business productivity and
                            improve your employee performance.</p>
                    </div>
                </div>
            </div>


            <div className="row pt-5">
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="row mb-md-0 mb-sm-2">
                        <div className="col-lg-12 col-md-6 col-12 d-flex justify-content-lg-end justify-content-md-center justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/call-forwarding-icon.png" alt="forwarding"/>
                                    <h4>Call Forwarding</h4>
                                </div>
                                <p>The Call Forwarding feature allows calls made to one number to be forwarded to
                                    another
                                    specified number to reduce the latency period and it will surely
                                    improve overall Communication system.</p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-6 col-12 mt-4 mt-lg-4 mt-md-0 d-flex justify-content-lg-end justify-content-md-center justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/call-waiting-icon.png" alt="call waiting"/>
                                    <h4>Call Waiting</h4>
                                </div>
                                <p>Tellipsis is one of the customer support company that provides best customer service
                                    to all its customers.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="calling-center-capting-img">
                        <img src="img/calling-feature-center-img.png" className="img-fluid d-block mx-auto"
                            alt="calling center girl image" />
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="row mt-lg-0 mt-md-5 mt-sm-2">
                        <div className="col-lg-12 col-md-6 col-12 mt-md-0 mt-sm-2 d-flex justify-content-lg-start justify-content-md-center justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/call-forwarding-icon.png" alt="forwarding"/>
                                    <h4>Call Forwarding</h4>
                                </div>
                                <p>The Call Forwarding feature allows calls made to one number to be forwarded to
                                    another
                                    specified number to reduce the latency period and it will surely
                                    improve overall Communication system.</p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-6 col-12 mt-4 mt-lg-4 mt-md-0 d-flex justify-content-lg-start justify-content-md-center justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/call-waiting-icon.png" alt="call waiting"/>
                                    <h4>Call Waiting</h4>
                                </div>
                                <p>Tellipsis is one of the customer support company that provides best customer service
                                    to all its customers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-lg-10 col-md-10 col-12">
                    <div className="call-screen-caption">
                        <div className="call-screen-box">
                            <div className="call-screen-icon-box">
                                <img src="/img/call-screen.png" className="pr-3" alt="forwarding"/>
                                <h4>Call Forwarding</h4>
                            </div>
                            <p className="m-0">The Call Forwarding feature allows calls made to one number to be forwarded
                                to another
                                specified number to reduce the latency period and it will surely
                                improve overall Communication system.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--calling-feature-section-end--> */}

    {/* <!--call-management-section-start--> */}
    <section className="call-management-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="calling-caption">
                        <h3 className="spprt-title text-black">Call Management</h3>
                        <div className="spprt-bdr pb-3">
                            <img src="/img/calling-bdr.png" className="img-fluid d-block mx-auto"
                                alt="support border" />
                        </div>
                        <p>With Tellipsis call recording features, you can increase your business productivity and
                            improve your employee performance.</p>
                    </div>
                </div>
            </div>


            <div className="row pt-5">
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="row flex-md-wrap justify-content-md-center">
                        <div className="col-lg-12 col-md-6 col-12 d-flex justify-content-lg-end justify-content-md-center justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/acd-bpx-icon.png" alt="forwarding"/>
                                    <h4>ACD PBXnt</h4>
                                </div>
                                <p>By Accessing ACD PBX Advance Feature you can improve your customer Call Experience
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-6 col-12 mt-lg-4 mt-md-0 mt-4 d-flex justify-content-lg-end justify-content-md-center justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/music-on-icon.png" alt="call waiting"/>
                                    <h4>Music On Hold</h4>
                                </div>
                                <p>Music on Hold is a feature that plays music and/or speech recordings when an inbound
                                    caller is placed on hold that will enhance the call waiting experience for your
                                    customers.</p>
                            </div>
                        </div>

                        <div className="col-lg-12 col-md-6 col-12 mt-4 d-flex justify-content-lg-end justify-content-md-center justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/dial-name-icon.png" alt="call waiting"/>
                                    <h4>Dail By Name</h4>
                                </div>
                                <p>Dial by Name attribute by the Tellipsis has been arranged with the Business Phone
                                    service in order to Speedup the dialing process by Tellipsis</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12 d-flex align-items-center justify-content-md-center mb-lg-0 mb-md-4 mb-sm-2">
                    <div className="calling-center-capting-img">
                        <img src="img/call-management-img.png" className="img-fluid d-block mx-auto"
                            alt="calling center girl" />
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="row flex-md-wrap justify-content-md-center">
                        <div className="col-lg-12 col-md-6 col-12 d-flex justify-content-lg-start justify-content-md-center justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/do-not-disturb-icon.png" alt="forwarding"/>
                                    <h4>Do Not Disturb</h4>
                                </div>
                                <p>Using Do Not Disturb feature, you can mute all calls, alerts and notifications on
                                    your device. This will give freedom to disable all incoming notifications.</p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-6 col-12 d-flex justify-content-lg-start justify-content-md-center mt-lg-4 mt-md-0 mt-4 justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/queue-icon.png" alt="call waiting"/>
                                    <h4 style={{paddingLeft: "20px"}}>Call Queue Management</h4>
                                </div>
                                <p>The Call Queue Management feature plays an important role in placing inbound callers
                                    in one or more virtual queues..</p>
                            </div>
                        </div>


                        <div className="col-lg-12 col-md-6 col-12 d-flex justify-content-lg-start justify-content-md-center mt-4 justify-content-center">
                            <div className="calling-inner-box">
                                <div className="calling-icon-box">
                                    <img src="/img/customized-icon.png" alt="call waiting"/>
                                    <h4 style={{paddingLeft: "20px"}}>Customized Messages</h4>
                                </div>
                                <p>The customized message feature is one of those helpful ones that can hold or even
                                    when all the agents are busy on other calls.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--call-management-section-start--> */}

    {/* <!--Miscellenous-section-start--> */}
    <section className="calling-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="calling-caption">
                        <h3 className="spprt-title text-black">Miscellenous</h3>
                        <div className="spprt-bdr pb-3">
                            <img src="img/calling-bdr.png" className="img-fluid d-block mx-auto"
                                alt="support border" />
                        </div>
                    </div>
                </div>
            </div>


            <div className="row pt-5">
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="row">
                        <div className="col-lg-12 col-md-6 col-12 d-flex justify-content-lg-end justify-content-md-center justify-content-center">
                            <div className="calling-inner-box miscellenour-box">
                                <div className="calling-icon-box">
                                    <img src="/img/voice-mail-icon.png" alt="forwarding"/>
                                    <h4>Voice Mail</h4>
                                </div>
                                <p>The voicemail system is designed for Tellipsis to communicate a recorded audio
                                    message of the caller to the recipient. To do this they contain a user interface for
                                    selecting, playing and managing messages; A delivery method that helps you find</p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-6 col-12 mt-lg-4 mt-md-0 mt-4 d-flex justify-content-lg-end justify-content-md-center justify-content-center ">
                            <div className="calling-inner-box miscellenour-box">
                                <div className="calling-icon-box">
                                    <img src="/img/internet-fax-icon.png" alt="call waiting"/>
                                    <h4>Internet Fax</h4>
                                </div>
                                <p>An Internet fax product is a technology that uses a global IP network to send a
                                    completely secure message that is encrypted and read only to the person to whom it
                                    send.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12 mb-lg-0 mb-md-4 mb-sm-2">
                    <div className="calling-center-capting-img">
                        <img src="/img/miscellenous-img.png" className="img-fluid d-block mx-auto"
                            alt="calling center girl" />
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="row">
                        <div className="col-lg-12 col-md-6 col-12 d-flex justify-content-lg-start justify-content-md-center justify-content-center">
                            <div className="calling-inner-box miscellenour-box">
                                <div className="calling-icon-box">
                                    <img src="/img/hosted-ivr-icon.png" alt="forwarding"/>
                                    <h4>Hosted IVR</h4>
                                </div>
                                <p>Hosted IVR stands for Interactive Voice Response Providers Interactive Response to
                                    Callers. It helps businesses isolate and sort through the callers who contact their
                                    organization</p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-6 col-12 d-flex justify-content-lg-start justify-content-md-center mt-lg-4 mt-md-0 mt-4 justify-content-center">
                            <div className="calling-inner-box miscellenour-box">
                                <div className="calling-icon-box">
                                    <img src="/img/softphone.png" alt="call waiting"/>
                                    <h4>Softphone</h4>
                                </div>
                                <p>A Softphone is a piece of software that allows a user to make telephone calls over
                                    the Internet via a computer. Let's switch to softphones and stay connected to your
                                    callers all day long from anywhere.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--Miscellenous-section-end--> */}

    {/* <!--sales-section-start--> */}
    <section className="sales-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                    <form className="sales-form">
                        <label className="form-label">First Name*</label>
                        <input type="text" className="form-control sales-input" id="type-name" placeholder="Type Name"/>
                        <label className="form-label">Last Name*</label>
                        <input type="last-name" className="form-control sales-input" id="last-name"
                            placeholder="Type Last Name"/>
                        <label className="form-label">Phone (With Country Code)*</label>
                        <input type="phone-code" className="form-control sales-input" id="phone-code"
                            placeholder="Type Phone Number"/>
                        <label className="form-label">Email Address*</label>
                        <input type="email" className="form-control sales-input" id="email"
                            placeholder="Type Email Address"/>
                        <label className="form-label">Company*</label>
                        <input type="text" className="form-control sales-input" id="company" placeholder="company"/>
                        <label className="form-label">Website</label>
                        <input type="text" className="form-control sales-input" id="website" placeholder="Type Website"/>
                        <label className="form-label">Source*</label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Type Source</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label className="form-label">Description</label>
                        <input type="description" className="form-control sales-input" id="description"
                            placeholder="Type Description"/>
                    </form>
                </div>

                <div className="col-lg-6 col-md-12 col-12 d-flex justify-content-lg-end justify-content-md-center mt-lg-0 mt-md-0 mt-5 justify-content-center">
                    <div className="sales-enquiry-caption ps-lg-3 ps-md-3 ps-sm-0 mt-lg-0 mt-md-4 text-lg-start text-md-center">
                        <h3>Sales Enquiry Form</h3>
                        <h4 className="sales-text-shadow">Sales Enquiry Form</h4>

                        <h5>Email Address</h5>
                        <p>support@Tellipsis.com</p>

                        <img src="img/sales-enquiry-img.png" className="d-block img-fluid w-100" alt="sales girl" />

                        <ul className="sales-checkbox">
                            <li><input type="checkbox" className="" id="salescheckbox" /><a href="#"><span>I agree to
                                        the</span> Privacy Policy, Acceptable Use Policy(AUP) and Terms of Service.</a>
                            </li>
                        </ul>

                        <div className="sales-enquiry-button d-flex justify-content-lg-around justify-content-md-between justify-content-between">
                            <button type="button" className="btn-info">Submit</button>
                            <button type="button" className="btn-info">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--sales-section-end--> */}

    {/* <!--footer-start--> */}

{/* <!--newsletter-section-start--> */}
<section className="newsletter-section">
    <div className="container">
        <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-12">
                <div className="newsletter-caption">
                    <ul>
                        <li>
                            <h3>Subscribe our Newsletter</h3>
                            <p>We’re a team of non-cynics who truly care for our work.</p>
                        </li>
                        <li>
                            <div className="input-group email-input">    
                                <input type="text" className="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon"/>
                                <div className="input-group-text"><img src="/img/news-email-icon.png" className="d-block img-fluid" alt="email icon" /></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
{/* <!--newsletter-section-end--> */}

<footer className="footer-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-12">
                    <div className="footer-logo-caption">
                        <img src="img/logo_white11.png" className="d-block img-fluid" alt="" />
                        <p>Tellipsis is a leading provider of telecommunication services.
                            We offer a wide range of telecommunication services including Hosted
                            PBX and cloud hosted business phone system.
                            Our Hosted PBX and cloud hosted business</p>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-12">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="footer-list">
                                <h4>OUR SERVICES</h4>
                                <ul>
                                    <li><a href="#">Hosted PBX</a></li>
                                    <li><a href="#">Call Center Solutions</a></li>
                                    <li><a href="#">VoIP Telephony</a></li>
                                    <li><a href="#">Toll Free Number</a></li>
                                    <li><a href="#">SIP Trunking</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="footer-list">
                                <h4>POPULAR</h4>
                                <ul>
                                    <li><a href="#">Hosted PBX</a></li>
                                    <li><a href="#">Call Center Solutions</a></li>
                                    <li><a href="#">VoIP Telephony</a></li>
                                    <li><a href="#">Toll Free Number</a></li>
                                    <li><a href="#">Channel Partners</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="footer-list">
                                <h4>COMPANY</h4>
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Refund & Cancellation Policy</a></li>
                                    <li><a href="#">AUP</a></li>
                                    <li><a href="#">Shipping Policy</a></li>
                                    <li><a href="#">Verification</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </footer>
    {/* <!--copyright-section-start--> */}
    <div className="copyright-section">
        <p>@Tellipsis.com All rights reserved</p>
    </div>
    {/* <!--copyright-section-end--> */}
    {/* <!--footer-end--> */}
   </>
  )
}

export default Homepage