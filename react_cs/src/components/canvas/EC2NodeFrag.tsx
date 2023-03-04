

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
    }else if (status === status_enum.starting){
        color = "blue"
    }else if (status===status_enum.running) {
        color = "green"
    }else if (status === status_enum.stopping){
        color = "orange"
    }else if (status === status_enum.stopped) {
        color = "red"
    }else if (status === status_enum.terminated){
        color = "yellow"
    }

    const EC2Clicked = () => {
        console.log('Only EC2 is clicke')
    }

    return (
        <>
            <div onClick={EC2Clicked}>
                <svg className="w-6 h-6" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="Arch_Amazon-EC2_32_svg__a"><stop stop-color="#C8511B" offset="0%"></stop><stop stop-color="#F90" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h40v40H0z" fill="url(#Arch_Amazon-EC2_32_svg__a)"></path><path d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z" fill="#FFF"></path></g></svg>
                <svg width="10" height="40" style={{/*{ backgroundColor: 'lightblue' } */ }} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" fill={color} stroke="black" />
                </svg>
                <div style={{ fontSize: 4, color: "#ccccff", textAlign: "center", paddingTop: "0px", backgroundColor: "white", }}>comp id: {data.label}</div>
            </div>
        </>
    )
}

export default EC2NodeFrag


