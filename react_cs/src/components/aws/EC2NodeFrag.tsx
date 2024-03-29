

const EC2NodeFrag = ({ data }: any) => {
    const status_enum = {
        "PREPARED": -1,
        "pending": 1,
        "starting": 2,
        "running": 3,
        "stopping": 4,
        "stopped": 5,
        "shutting_down": 6,
        "terminated": 7
    };

    const status = data.api_object.ec2_status
    let color = "white"
    if (status === status_enum.PREPARED) {
        color = "white"
    } else if (status === status_enum.pending) {
        color = "grey"
    } else if (status === status_enum.starting) {
        color = "blue"
    } else if (status === status_enum.running) {
        color = "green"
    } else if (status === status_enum.stopping) {
        color = "orange"
    } else if (status === status_enum.stopped) {
        color = "yellow"
    } else if (status === status_enum.terminated) {
        color = "red"
    }

    const EC2Clicked = () => {
        console.log('Only EC2 is clicke')
    }

    return (
        <>
            {data.api_object.aws_component === 'ec2' ?
                <div onClick={EC2Clicked}>
                    <svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Amazon-EC2_32_svg__a"><stop stop-color="#C8511B" offset="0%"></stop><stop stop-color="#F90" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Amazon-EC2_32_svg__a)"></path><path d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z" fill="#FFF"></path></g></svg>
                    <svg width="10" height="40" style={{/*{ backgroundColor: 'lightblue' } */ }} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" fill={color} stroke="black" />
                    </svg>
                    <div style={{ fontSize: 4, color: "#ccccff", textAlign: "center", paddingTop: "0px", backgroundColor: "white", }}>comp id: {data.label}</div>
                </div>
                : null
            }

            {data.api_object.aws_component === 'rds' ?
                <div>
                    <svg width="30" height="100" viewBox="0 0 256 289" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M0 224.742l29.972 35.125 2.695-3.201V32l-2.695-3.395L0 63.717v161.025" fill="#1A476F" /><path d="M29.976 259.867l57.27 28.633 2.382-3.833L89.667 3l-2.381-3-57.31 28.541v231.326" fill="#1F5B98" /><path d="M256 63.717l-29.98-35.112-3.353 1.062.666 227.333 2.687 2.867L256 224.746V63.717" fill="#2D72B8" /><path d="M168.75 288.5l57.27-28.633V28.541L168.71 0 166 3.667l.039 280.666 2.711 4.167" fill="#5294CF" /><path d="M87.286 0h81.424v288.504H87.286V0z" fill="#2D72B8" /></svg>
                    <svg width="10" height="40" style={{/*{ backgroundColor: 'lightblue' } */ }} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" fill={color} stroke="black" />
                    </svg>
                    <div style={{ fontSize: 4, color: "#ccccff", textAlign: "center", paddingTop: "0px", backgroundColor: "white", }}>comp id: {data.label}</div>
                </div>
                : null
            }

        </>
    )
}

export default EC2NodeFrag


