import MainHeader from "../components/header.comp";

// Layout for live and admin page
function MainPageLayout({ childComponent }: any) {
  const ChildComponent = () => childComponent
  return (
    <div className="main-page">
      <MainHeader />
      <ChildComponent />
    </div>
  );
}

export default MainPageLayout;
