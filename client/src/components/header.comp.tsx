import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";


function MainHeader(){
    return (
        <header className="flex-s-betw main-header">
            <div className="flex-center JaMoveo-logo">
                <HeadphonesOutlinedIcon style={{fontSize: 35}} />
                <p>JAMOVEO</p>
            </div>
            <img src="images/profile-picture.webp" />
        </header>
    )
}

export default MainHeader