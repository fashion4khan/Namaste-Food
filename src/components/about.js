// import User from "./User";
import UserClass from "./UserClass";
import React, { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);

    // console.log("Parent constructor !");
  }

  componentDidMount() {
    // console.log("Parent component did mount !")
  }
  render() {
    // console.log("Parent render !");
    return (
      <div className="p-24">
        <h1>about us</h1>
        <h1>swiggy #</h1>
        {/* <User name={"fashion khan"} /> */}
        <UserClass name={"rusmeen khan"} location={"gurgoan haryana"} />
      </div>
    );
  }
}

// const About = () => {
//     return (
//         <>
//             <h1>about us</h1>
//             <h1>swiggy #</h1>
//             <User name ={"fashion khan"}/>
//             <UserClass name={"rusmeen khan"} location={"gurgoan haryana"}/>
//         </>
//     );
// };

export default About;
