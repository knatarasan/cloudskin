import React, { ReactElement } from 'react'
import { Container, Navbar, Nav, Table, Col, Row, Button } from "react-bootstrap";

type IconTesterProps = {
    readonly schema: any,
    data?: any,
}


const IconTester = ({ schema, data }: IconTesterProps): ReactElement => {


    return (
        <>
            <div>
                <Container className="bg-primary">
                    <Row>
                        One
                    </Row>
                    <Row>
                        Two
                    </Row>
                    <Row>
                        Three
                    </Row>
                </Container>
            </div>
            <br />

            <div style={{ display: 'flex', backgroundColor: 'green' }}>
                <div>
                    One multiple ones
                </div>
                <div>
                    Two
                </div>
                <div>
                    Three
                </div>
            </div>
            <br />
            <div style={{ display: 'flex', backgroundColor: 'orange' }}>
                <div>
                    <svg className="w-6 h-6" height="48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M37.006 32.082c-4.591 0-6.958-1.473-6.958-2.101v-3.53c1.729.943 4.35 1.43 6.958 1.43 2.609 0 5.229-.487 6.958-1.43v3.53c0 .628-2.367 2.101-6.958 2.101zm0 6.092c-4.591 0-6.958-1.473-6.958-2.101v-3.421c1.729.943 4.35 1.43 6.958 1.43 2.609 0 5.229-.487 6.958-1.43v3.421c0 .628-2.367 2.101-6.958 2.101zm0 5.439c-4.591 0-6.958-1.472-6.958-2.1v-2.769c1.729.942 4.35 1.43 6.958 1.43 2.609 0 5.229-.488 6.958-1.43v2.769c0 .628-2.367 2.1-6.958 2.1zm0-21.933c4.59 0 6.958 1.472 6.958 2.1 0 .628-2.367 2.101-6.958 2.101s-6.958-1.473-6.958-2.101c0-.628 2.367-2.1 6.958-2.1zm0-2c-4.451 0-8.958 1.408-8.958 4.1v17.733c0 2.692 4.507 4.1 8.958 4.1 4.45 0 8.958-1.408 8.958-4.1V23.78c0-2.692-4.507-4.1-8.958-4.1zM7.75 43.853h19.664v2H7.75A5.756 5.756 0 012 40.103V7.751A5.757 5.757 0 017.75 2h32.354c3.17 0 5.75 2.58 5.75 5.751v12.688h-2V7.751A3.755 3.755 0 0040.104 4H7.75A3.755 3.755 0 004 7.751v32.352a3.755 3.755 0 003.75 3.75zM40.629 7.805v5.336h2.197v.707h-3.043V7.805h.846zm-4.3 5.458c-.47 0-.824-.204-1.062-.615-.24-.41-.358-1.015-.358-1.818 0-.802.119-1.406.358-1.813.238-.407.593-.611 1.063-.611s.825.204 1.065.611c.237.407.356 1.011.356 1.813 0 .803-.12 1.408-.356 1.818-.24.411-.594.615-1.065.615zm1.867-.406c.279-.526.418-1.201.418-2.027 0-.994-.2-1.766-.601-2.315-.401-.549-.962-.824-1.683-.824-.72 0-1.281.275-1.682.824-.402.549-.602 1.321-.602 2.315 0 .634.083 1.183.248 1.648.166.465.41.826.737 1.082.326.255.718.394 1.177.418.332.361.694.648 1.09.864a3.58 3.58 0 001.256.409v-.741a3.25 3.25 0 01-.828-.2c-.25-.1-.491-.242-.724-.428.517-.157.915-.498 1.194-1.025zm-6.1.136c.179-.175.267-.416.267-.724 0-.418-.232-.747-.697-.985l-.62-.314c-.39-.198-.671-.424-.846-.68-.173-.256-.261-.57-.261-.942 0-.494.154-.894.463-1.199.307-.305.71-.458 1.21-.458.39 0 .827.105 1.309.314v.681a2.96 2.96 0 00-1.247-.271c-.273 0-.49.08-.65.239-.16.16-.24.377-.24.651 0 .215.056.397.166.548.11.152.294.294.55.428l.618.314c.379.192.657.419.833.679.178.263.267.577.267.943 0 .529-.166.955-.497 1.277-.332.322-.774.484-1.325.484a3.26 3.26 0 01-.773-.091 2.129 2.129 0 01-.64-.266v-.672c.476.204.938.305 1.386.305.308 0 .55-.087.728-.261zm-5.022-2.725a.709.709 0 01.624-.336c.239 0 .415.088.532.266.116.178.174.452.174.823 0 .041-.002.082-.004.124a1.51 1.51 0 00-.004.113h-1.57c.018-.437.1-.766.248-.99zm1.976 2.759c-.401.181-.768.271-1.1.271-.388 0-.673-.116-.85-.349-.177-.232-.268-.61-.274-1.134h2.233c.046-.22.069-.462.069-.723 0-.587-.118-1.031-.353-1.334-.236-.302-.583-.453-1.042-.453-.54 0-.956.2-1.247.601-.291.401-.436.977-.436 1.727 0 .784.145 1.368.436 1.753.29.383.732.575 1.326.575.47 0 .882-.11 1.238-.332v-.602zm-4.251-3.501c.17-.09.367-.134.588-.134.094 0 .186.008.279.026v.759a2.806 2.806 0 00-.392-.035c-.331 0-.633.107-.907.322v3.384h-.82V9.427h.68l.079.531c.157-.197.32-.341.493-.432zm-3.99 3.563a.688.688 0 01-.644-.38c-.14-.253-.21-.641-.21-1.164 0-.534.066-.929.197-1.182a.647.647 0 01.615-.379c.26 0 .528.105.8.315v2.458c-.266.221-.52.332-.757.332zm.533 1.647c-.151.222-.407.331-.768.331-.331 0-.714-.089-1.15-.269v.628c.372.215.778.322 1.22.322 1.157 0 1.736-.718 1.736-2.153V9.427h-.681l-.06.357c-.338-.314-.69-.471-1.056-.471-.441 0-.793.204-1.055.611-.261.406-.392.956-.392 1.647 0 .437.057.819.17 1.147.113.328.277.585.493.767.215.183.47.275.767.275.348 0 .683-.148 1.002-.445v.323c0 .511-.076.878-.226 1.098zm-4.648-2.049v-2.598h-.62v-.54l.656-.105.12-1.256h.664v1.239h1.012v.662h-1.012v2.538c0 .221.036.376.109.466.072.09.202.135.388.135.18 0 .357-.029.532-.087v.601c-.25.106-.515.157-.794.157-.36 0-.626-.098-.798-.296-.171-.198-.257-.502-.257-.916zm-1.834.458c.118-.113.178-.275.178-.484 0-.25-.16-.453-.48-.61l-.567-.279c-.523-.255-.784-.657-.784-1.203 0-.372.122-.674.365-.907.245-.232.562-.349.952-.349.366 0 .717.093 1.054.28v.592a2.284 2.284 0 00-.985-.227c-.197 0-.355.053-.471.157a.547.547 0 00-.174.428c0 .145.039.267.118.366.078.099.21.194.396.287l.532.262c.274.134.472.294.597.479.126.187.187.416.187.69 0 .4-.124.724-.374.968s-.585.366-1.002.366c-.45 0-.855-.108-1.221-.323v-.593c.453.181.846.27 1.177.27.214 0 .38-.056.502-.17zm-3.38-.252a.717.717 0 01-.671.405.713.713 0 01-.671-.405c-.146-.271-.22-.691-.22-1.26 0-.571.074-.988.22-1.256a.713.713 0 01.67-.401c.303 0 .527.133.673.401.144.268.217.685.217 1.256 0 .569-.073.989-.217 1.26zm-.671-3.58c-.552 0-.975.201-1.27.602-.292.401-.44.974-.44 1.718 0 .749.148 1.325.44 1.725.295.402.718.603 1.27.603s.975-.201 1.268-.603c.294-.4.44-.976.44-1.725 0-.744-.146-1.317-.44-1.718-.293-.401-.716-.602-1.268-.602zm-3.457 1.204a.753.753 0 01-.641.313h-.863V8.476h.863c.273 0 .486.103.64.309.155.207.232.496.232.868 0 .367-.077.654-.231.864zm.305-2.477a1.579 1.579 0 00-.86-.235h-1.77v6.043h.82v-2.346h.95c.483 0 .874-.169 1.174-.506.299-.337.449-.785.449-1.343 0-.36-.065-.679-.196-.959a1.522 1.522 0 00-.567-.654z" fill="#2E27AD" fill-rule="evenodd"></path></svg>
                </div>
                <div>
                    <svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Amazon-EC2_32_svg__a"><stop stop-color="#C8511B" offset="0%"></stop><stop stop-color="#F90" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Amazon-EC2_32_svg__a)"></path><path d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z" fill="#FFF"></path></g></svg>
                </div>
                <div>
                    <svg height="50" width="20" style={{ backgroundColor: 'lightblue' }} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="0" r="4" fill="red" stroke="red" />
                    </svg>

                </div>
            </div>
            <br />
            <Container>
                <Row>
                    <Col>
                        <svg className="w-6 h-6" height="48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M37.006 32.082c-4.591 0-6.958-1.473-6.958-2.101v-3.53c1.729.943 4.35 1.43 6.958 1.43 2.609 0 5.229-.487 6.958-1.43v3.53c0 .628-2.367 2.101-6.958 2.101zm0 6.092c-4.591 0-6.958-1.473-6.958-2.101v-3.421c1.729.943 4.35 1.43 6.958 1.43 2.609 0 5.229-.487 6.958-1.43v3.421c0 .628-2.367 2.101-6.958 2.101zm0 5.439c-4.591 0-6.958-1.472-6.958-2.1v-2.769c1.729.942 4.35 1.43 6.958 1.43 2.609 0 5.229-.488 6.958-1.43v2.769c0 .628-2.367 2.1-6.958 2.1zm0-21.933c4.59 0 6.958 1.472 6.958 2.1 0 .628-2.367 2.101-6.958 2.101s-6.958-1.473-6.958-2.101c0-.628 2.367-2.1 6.958-2.1zm0-2c-4.451 0-8.958 1.408-8.958 4.1v17.733c0 2.692 4.507 4.1 8.958 4.1 4.45 0 8.958-1.408 8.958-4.1V23.78c0-2.692-4.507-4.1-8.958-4.1zM7.75 43.853h19.664v2H7.75A5.756 5.756 0 012 40.103V7.751A5.757 5.757 0 017.75 2h32.354c3.17 0 5.75 2.58 5.75 5.751v12.688h-2V7.751A3.755 3.755 0 0040.104 4H7.75A3.755 3.755 0 004 7.751v32.352a3.755 3.755 0 003.75 3.75zM40.629 7.805v5.336h2.197v.707h-3.043V7.805h.846zm-4.3 5.458c-.47 0-.824-.204-1.062-.615-.24-.41-.358-1.015-.358-1.818 0-.802.119-1.406.358-1.813.238-.407.593-.611 1.063-.611s.825.204 1.065.611c.237.407.356 1.011.356 1.813 0 .803-.12 1.408-.356 1.818-.24.411-.594.615-1.065.615zm1.867-.406c.279-.526.418-1.201.418-2.027 0-.994-.2-1.766-.601-2.315-.401-.549-.962-.824-1.683-.824-.72 0-1.281.275-1.682.824-.402.549-.602 1.321-.602 2.315 0 .634.083 1.183.248 1.648.166.465.41.826.737 1.082.326.255.718.394 1.177.418.332.361.694.648 1.09.864a3.58 3.58 0 001.256.409v-.741a3.25 3.25 0 01-.828-.2c-.25-.1-.491-.242-.724-.428.517-.157.915-.498 1.194-1.025zm-6.1.136c.179-.175.267-.416.267-.724 0-.418-.232-.747-.697-.985l-.62-.314c-.39-.198-.671-.424-.846-.68-.173-.256-.261-.57-.261-.942 0-.494.154-.894.463-1.199.307-.305.71-.458 1.21-.458.39 0 .827.105 1.309.314v.681a2.96 2.96 0 00-1.247-.271c-.273 0-.49.08-.65.239-.16.16-.24.377-.24.651 0 .215.056.397.166.548.11.152.294.294.55.428l.618.314c.379.192.657.419.833.679.178.263.267.577.267.943 0 .529-.166.955-.497 1.277-.332.322-.774.484-1.325.484a3.26 3.26 0 01-.773-.091 2.129 2.129 0 01-.64-.266v-.672c.476.204.938.305 1.386.305.308 0 .55-.087.728-.261zm-5.022-2.725a.709.709 0 01.624-.336c.239 0 .415.088.532.266.116.178.174.452.174.823 0 .041-.002.082-.004.124a1.51 1.51 0 00-.004.113h-1.57c.018-.437.1-.766.248-.99zm1.976 2.759c-.401.181-.768.271-1.1.271-.388 0-.673-.116-.85-.349-.177-.232-.268-.61-.274-1.134h2.233c.046-.22.069-.462.069-.723 0-.587-.118-1.031-.353-1.334-.236-.302-.583-.453-1.042-.453-.54 0-.956.2-1.247.601-.291.401-.436.977-.436 1.727 0 .784.145 1.368.436 1.753.29.383.732.575 1.326.575.47 0 .882-.11 1.238-.332v-.602zm-4.251-3.501c.17-.09.367-.134.588-.134.094 0 .186.008.279.026v.759a2.806 2.806 0 00-.392-.035c-.331 0-.633.107-.907.322v3.384h-.82V9.427h.68l.079.531c.157-.197.32-.341.493-.432zm-3.99 3.563a.688.688 0 01-.644-.38c-.14-.253-.21-.641-.21-1.164 0-.534.066-.929.197-1.182a.647.647 0 01.615-.379c.26 0 .528.105.8.315v2.458c-.266.221-.52.332-.757.332zm.533 1.647c-.151.222-.407.331-.768.331-.331 0-.714-.089-1.15-.269v.628c.372.215.778.322 1.22.322 1.157 0 1.736-.718 1.736-2.153V9.427h-.681l-.06.357c-.338-.314-.69-.471-1.056-.471-.441 0-.793.204-1.055.611-.261.406-.392.956-.392 1.647 0 .437.057.819.17 1.147.113.328.277.585.493.767.215.183.47.275.767.275.348 0 .683-.148 1.002-.445v.323c0 .511-.076.878-.226 1.098zm-4.648-2.049v-2.598h-.62v-.54l.656-.105.12-1.256h.664v1.239h1.012v.662h-1.012v2.538c0 .221.036.376.109.466.072.09.202.135.388.135.18 0 .357-.029.532-.087v.601c-.25.106-.515.157-.794.157-.36 0-.626-.098-.798-.296-.171-.198-.257-.502-.257-.916zm-1.834.458c.118-.113.178-.275.178-.484 0-.25-.16-.453-.48-.61l-.567-.279c-.523-.255-.784-.657-.784-1.203 0-.372.122-.674.365-.907.245-.232.562-.349.952-.349.366 0 .717.093 1.054.28v.592a2.284 2.284 0 00-.985-.227c-.197 0-.355.053-.471.157a.547.547 0 00-.174.428c0 .145.039.267.118.366.078.099.21.194.396.287l.532.262c.274.134.472.294.597.479.126.187.187.416.187.69 0 .4-.124.724-.374.968s-.585.366-1.002.366c-.45 0-.855-.108-1.221-.323v-.593c.453.181.846.27 1.177.27.214 0 .38-.056.502-.17zm-3.38-.252a.717.717 0 01-.671.405.713.713 0 01-.671-.405c-.146-.271-.22-.691-.22-1.26 0-.571.074-.988.22-1.256a.713.713 0 01.67-.401c.303 0 .527.133.673.401.144.268.217.685.217 1.256 0 .569-.073.989-.217 1.26zm-.671-3.58c-.552 0-.975.201-1.27.602-.292.401-.44.974-.44 1.718 0 .749.148 1.325.44 1.725.295.402.718.603 1.27.603s.975-.201 1.268-.603c.294-.4.44-.976.44-1.725 0-.744-.146-1.317-.44-1.718-.293-.401-.716-.602-1.268-.602zm-3.457 1.204a.753.753 0 01-.641.313h-.863V8.476h.863c.273 0 .486.103.64.309.155.207.232.496.232.868 0 .367-.077.654-.231.864zm.305-2.477a1.579 1.579 0 00-.86-.235h-1.77v6.043h.82v-2.346h.95c.483 0 .874-.169 1.174-.506.299-.337.449-.785.449-1.343 0-.36-.065-.679-.196-.959a1.522 1.522 0 00-.567-.654z" fill="#2E27AD" fill-rule="evenodd"></path></svg>
                    </Col>
                    <Col>
                        <svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Amazon-EC2_32_svg__a"><stop stop-color="#C8511B" offset="0%"></stop><stop stop-color="#F90" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Amazon-EC2_32_svg__a)"></path><path d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z" fill="#FFF"></path></g></svg>
                    </Col>
                    <Col>
                        <svg height="50" width="20" style={{ backgroundColor: 'lightblue' }} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="0" r="4" fill="red" stroke="red" />
                        </svg>
                    </Col>
                </Row>
            </Container>

            <br />
            <div style={{ display: 'flex', flexDirection: "column", backgroundColor: 'orange' }}>
                <div>
                    <svg className="w-6 h-6" height="48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M37.006 32.082c-4.591 0-6.958-1.473-6.958-2.101v-3.53c1.729.943 4.35 1.43 6.958 1.43 2.609 0 5.229-.487 6.958-1.43v3.53c0 .628-2.367 2.101-6.958 2.101zm0 6.092c-4.591 0-6.958-1.473-6.958-2.101v-3.421c1.729.943 4.35 1.43 6.958 1.43 2.609 0 5.229-.487 6.958-1.43v3.421c0 .628-2.367 2.101-6.958 2.101zm0 5.439c-4.591 0-6.958-1.472-6.958-2.1v-2.769c1.729.942 4.35 1.43 6.958 1.43 2.609 0 5.229-.488 6.958-1.43v2.769c0 .628-2.367 2.1-6.958 2.1zm0-21.933c4.59 0 6.958 1.472 6.958 2.1 0 .628-2.367 2.101-6.958 2.101s-6.958-1.473-6.958-2.101c0-.628 2.367-2.1 6.958-2.1zm0-2c-4.451 0-8.958 1.408-8.958 4.1v17.733c0 2.692 4.507 4.1 8.958 4.1 4.45 0 8.958-1.408 8.958-4.1V23.78c0-2.692-4.507-4.1-8.958-4.1zM7.75 43.853h19.664v2H7.75A5.756 5.756 0 012 40.103V7.751A5.757 5.757 0 017.75 2h32.354c3.17 0 5.75 2.58 5.75 5.751v12.688h-2V7.751A3.755 3.755 0 0040.104 4H7.75A3.755 3.755 0 004 7.751v32.352a3.755 3.755 0 003.75 3.75zM40.629 7.805v5.336h2.197v.707h-3.043V7.805h.846zm-4.3 5.458c-.47 0-.824-.204-1.062-.615-.24-.41-.358-1.015-.358-1.818 0-.802.119-1.406.358-1.813.238-.407.593-.611 1.063-.611s.825.204 1.065.611c.237.407.356 1.011.356 1.813 0 .803-.12 1.408-.356 1.818-.24.411-.594.615-1.065.615zm1.867-.406c.279-.526.418-1.201.418-2.027 0-.994-.2-1.766-.601-2.315-.401-.549-.962-.824-1.683-.824-.72 0-1.281.275-1.682.824-.402.549-.602 1.321-.602 2.315 0 .634.083 1.183.248 1.648.166.465.41.826.737 1.082.326.255.718.394 1.177.418.332.361.694.648 1.09.864a3.58 3.58 0 001.256.409v-.741a3.25 3.25 0 01-.828-.2c-.25-.1-.491-.242-.724-.428.517-.157.915-.498 1.194-1.025zm-6.1.136c.179-.175.267-.416.267-.724 0-.418-.232-.747-.697-.985l-.62-.314c-.39-.198-.671-.424-.846-.68-.173-.256-.261-.57-.261-.942 0-.494.154-.894.463-1.199.307-.305.71-.458 1.21-.458.39 0 .827.105 1.309.314v.681a2.96 2.96 0 00-1.247-.271c-.273 0-.49.08-.65.239-.16.16-.24.377-.24.651 0 .215.056.397.166.548.11.152.294.294.55.428l.618.314c.379.192.657.419.833.679.178.263.267.577.267.943 0 .529-.166.955-.497 1.277-.332.322-.774.484-1.325.484a3.26 3.26 0 01-.773-.091 2.129 2.129 0 01-.64-.266v-.672c.476.204.938.305 1.386.305.308 0 .55-.087.728-.261zm-5.022-2.725a.709.709 0 01.624-.336c.239 0 .415.088.532.266.116.178.174.452.174.823 0 .041-.002.082-.004.124a1.51 1.51 0 00-.004.113h-1.57c.018-.437.1-.766.248-.99zm1.976 2.759c-.401.181-.768.271-1.1.271-.388 0-.673-.116-.85-.349-.177-.232-.268-.61-.274-1.134h2.233c.046-.22.069-.462.069-.723 0-.587-.118-1.031-.353-1.334-.236-.302-.583-.453-1.042-.453-.54 0-.956.2-1.247.601-.291.401-.436.977-.436 1.727 0 .784.145 1.368.436 1.753.29.383.732.575 1.326.575.47 0 .882-.11 1.238-.332v-.602zm-4.251-3.501c.17-.09.367-.134.588-.134.094 0 .186.008.279.026v.759a2.806 2.806 0 00-.392-.035c-.331 0-.633.107-.907.322v3.384h-.82V9.427h.68l.079.531c.157-.197.32-.341.493-.432zm-3.99 3.563a.688.688 0 01-.644-.38c-.14-.253-.21-.641-.21-1.164 0-.534.066-.929.197-1.182a.647.647 0 01.615-.379c.26 0 .528.105.8.315v2.458c-.266.221-.52.332-.757.332zm.533 1.647c-.151.222-.407.331-.768.331-.331 0-.714-.089-1.15-.269v.628c.372.215.778.322 1.22.322 1.157 0 1.736-.718 1.736-2.153V9.427h-.681l-.06.357c-.338-.314-.69-.471-1.056-.471-.441 0-.793.204-1.055.611-.261.406-.392.956-.392 1.647 0 .437.057.819.17 1.147.113.328.277.585.493.767.215.183.47.275.767.275.348 0 .683-.148 1.002-.445v.323c0 .511-.076.878-.226 1.098zm-4.648-2.049v-2.598h-.62v-.54l.656-.105.12-1.256h.664v1.239h1.012v.662h-1.012v2.538c0 .221.036.376.109.466.072.09.202.135.388.135.18 0 .357-.029.532-.087v.601c-.25.106-.515.157-.794.157-.36 0-.626-.098-.798-.296-.171-.198-.257-.502-.257-.916zm-1.834.458c.118-.113.178-.275.178-.484 0-.25-.16-.453-.48-.61l-.567-.279c-.523-.255-.784-.657-.784-1.203 0-.372.122-.674.365-.907.245-.232.562-.349.952-.349.366 0 .717.093 1.054.28v.592a2.284 2.284 0 00-.985-.227c-.197 0-.355.053-.471.157a.547.547 0 00-.174.428c0 .145.039.267.118.366.078.099.21.194.396.287l.532.262c.274.134.472.294.597.479.126.187.187.416.187.69 0 .4-.124.724-.374.968s-.585.366-1.002.366c-.45 0-.855-.108-1.221-.323v-.593c.453.181.846.27 1.177.27.214 0 .38-.056.502-.17zm-3.38-.252a.717.717 0 01-.671.405.713.713 0 01-.671-.405c-.146-.271-.22-.691-.22-1.26 0-.571.074-.988.22-1.256a.713.713 0 01.67-.401c.303 0 .527.133.673.401.144.268.217.685.217 1.256 0 .569-.073.989-.217 1.26zm-.671-3.58c-.552 0-.975.201-1.27.602-.292.401-.44.974-.44 1.718 0 .749.148 1.325.44 1.725.295.402.718.603 1.27.603s.975-.201 1.268-.603c.294-.4.44-.976.44-1.725 0-.744-.146-1.317-.44-1.718-.293-.401-.716-.602-1.268-.602zm-3.457 1.204a.753.753 0 01-.641.313h-.863V8.476h.863c.273 0 .486.103.64.309.155.207.232.496.232.868 0 .367-.077.654-.231.864zm.305-2.477a1.579 1.579 0 00-.86-.235h-1.77v6.043h.82v-2.346h.95c.483 0 .874-.169 1.174-.506.299-.337.449-.785.449-1.343 0-.36-.065-.679-.196-.959a1.522 1.522 0 00-.567-.654z" fill="#2E27AD" fill-rule="evenodd"></path></svg>
                </div>
                <div>
                    <svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Amazon-EC2_32_svg__a"><stop stop-color="#C8511B" offset="0%"></stop><stop stop-color="#F90" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Amazon-EC2_32_svg__a)"></path><path d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z" fill="#FFF"></path></g></svg>
                </div>
                <div>
                    <svg height="50" width="20" style={{ backgroundColor: 'lightblue' }} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="0" r="4" fill="red" stroke="red" />
                    </svg>

                </div>
            </div>

        

        </>
    )
}

export default IconTester