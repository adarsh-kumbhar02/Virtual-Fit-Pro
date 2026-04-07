import React from "react";
import { Image, Card } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="AboutUs">
      <h1 style={{ textAlign: "center" }}>The Team</h1>

      <div className="image_container">
        <Card className="_card" style={{ width: "15rem" }}>
          <center>
            <Image
              src=""
              roundedCircle
              bsPrefix
            />
          </center>
          <Card.Body>
            <Card.Title className="_card_title" style={{ textAlign: "center" }}>
              Lalit Dhake
            </Card.Title>
            <center>
              <SocialIcon
                className="_gmail"
                url="mailto:absking786@gmail.com"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="_github"
                url=""
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="_linkedin"
                url=""
                style={{ height: 40, width: 40 }}
              />
            </center>
          </Card.Body>
        </Card>
        <Card className="_card" style={{ width: "15rem" }}>
          <center>
            <Image
              src=""
              roundedCircle
              bsPrefix
            />
          </center>
          <Card.Body>
            <Card.Title className="_card_title" style={{ textAlign: "center" }}>
              Adarsh Kumbhar
            </Card.Title>
            <center>
              <SocialIcon
                className="_gmail"
                url="mailto:ingalepiyush@gmail.com"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="_github"
                url=""
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="_linkedin"
                url=""
                style={{ height: 40, width: 40 }}
              />
            </center>
          </Card.Body>
        </Card>
        <Card className="_card" style={{ width: "15rem" }}>
          <center>
            <Image
              src=""
              roundedCircle
              bsPrefix
            />
          </center>
          <Card.Body>
            <Card.Title className="_card_title" style={{ textAlign: "center" }}>
              Soham Borkar
            </Card.Title>
            <center>
              <SocialIcon
                className="_gmail"
                url="mailto:parthdhake@gmail.com"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="_github"
                url=""
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="_linkedin"
                url=""
                style={{ height: 40, width: 40 }}
              />
            </center>
          </Card.Body>
        </Card>
        {/* <Card className="_card" style={{ width: "15rem" }}>
          <center>
            <Image
              src="https://avatars.githubusercontent.com/u/90845550?v=4"
              roundedCircle
              bsPrefix
            />
          </center>
          <Card.Body>
            <Card.Title className="_card_title" style={{ textAlign: "center" }}>
              Saurabh Chintawar
            </Card.Title>
            <center>
              <SocialIcon
                className="_gmail"
                url="mailto:chintawar672000@gmail.com"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="_github"
                url="https://github.com/Saurabhrc"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="_linkedin"
                url=""
                style={{ height: 40, width: 40 }}
              />
            </center>
          </Card.Body>
        </Card> */}
      </div>
      <div className="aboutus_heading">
        <h2 style={{ textAlign: "center" }}>About VirtualFitPro</h2>
      </div>
      <div className="aboutus_desc">
        <p>
          A computer-assisted training system that can recognize the poses
          performed by the user and assist them in improving their stance by
          delivering relevant feedback. The system evaluates the practitioner's
          posture by extracting feature vectors using computer vision
          techniques.
        </p>
      </div>
      <div className="aboutus_heading">
        <h2 style={{ textAlign: "center" }}>Technologies Used</h2>
      </div>
      <div className="aboutus_desc">
        <ol className="aboutus_list" style={{ marginInline: "-20px" }}>
          <li>
            <b>React</b>: A free and open-source front-end JavaScript library
            for building user interfaces based on UI components. It is
            maintained by Meta and a community of individual developers and
            companies
          </li>
          <li>
            <b>MediaPipe</b>: MediaPipe Pose is a machine learning solution for
            high-fidelity body pose tracking that utilises BlazePose, a pose
            detection model to infer 33 3D landmarks and a background
            segmentation mask on the entire body from RGB video frames.
          </li>
          <li>
            <b>Firebase</b>: Firebase is a platform developed by Google for
            creating mobile and web applications.
          </li>
          <li>
            <b>Vercel</b>: Vercel is a platform for frontend frameworks and
            static sites, built to integrate with headless content, commerce, or
            database.
          </li>
        </ol>
      </div>
    </div>
  );
}
