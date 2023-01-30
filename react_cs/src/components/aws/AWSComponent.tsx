import { useState } from "react"
import { Container, Col, Row } from "react-bootstrap";

const AWSComponent = ({ comp }) => {
    const [props, setProps] = useState({})

    let icon: any = null;

    if (comp === 'ec2') {
        icon = <svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Amazon-EC2_32_svg__a"><stop stop-color="#C8511B" offset="0%"></stop><stop stop-color="#F90" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Amazon-EC2_32_svg__a)"></path><path d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z" fill="#FFF"></path></g></svg>

    } else if (comp === 'lb') {
        icon = <svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Elastic-Load-Balancing_32_svg__a"><stop stop-color="#4D27A8" offset="0%"></stop><stop stop-color="#A166FF" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Elastic-Load-Balancing_32_svg__a)"></path><path d="M15 27c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7m14 1c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2m0-20c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2m1 10.5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2M22.931 21h4.12A2.997 2.997 0 0030 23.5c1.654 0 3-1.346 3-3s-1.346-3-3-3a2.997 2.997 0 00-2.949 2.5H23c0-1.489-.416-2.88-1.128-4.075l4.827-4.023A2.982 2.982 0 0029 13c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .361.074.702.191 1.022l-4.885 4.072A7.985 7.985 0 0015 12c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.985 7.985 0 006.306-3.094l4.885 4.072c-.117.32-.191.661-.191 1.022 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.929 0-1.75.433-2.301 1.098l-4.827-4.023A7.927 7.927 0 0022.931 21" fill="#FFF"></path></g></svg>
    }
    return (
        <>
            {icon}
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="10" r="8" fill="red" stroke="red" />
            </svg>
        </>

    )

}

// export default AWSComponent