import React from "react"; // comment: react import
import PageLayout from "../components/PageLayout"; // comment: layout

const Home: React.FC = () => { // comment: home component
  return ( // comment: render
    <PageLayout title="Home"> {/* comment: layout wrapper */}
      <p>ברוך הבא למערכת.</p> {/* comment: placeholder */}
    </PageLayout>
  ); // comment: end return
}; // comment: end component

export default Home; // comment: export
