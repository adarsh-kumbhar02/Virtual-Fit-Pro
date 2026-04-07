import React, { useState } from "react";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import gym_practice from "../../assets/gym_practice.jpg";
import "./SelectionPractice.css";
export default function SelectionPractice() {
  const navigate = useNavigate();
  const [workoutLearnRoute, setworkoutLearnRoute] = useState(
    "/workout-practice?level=Beginner"
  );
  return (
    <div className="SelectionPractice">
      <div className="practice_select_container">
        <div className="workout_practice_select">
          <Card
            className="workout_card"
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "2rem",
              color: "#FF8999",
            }}
          >
            <Card.Img
              className="workout_card_img"
              variant="top"
              src={gym_practice}
            />
            <Card.Body>
              <Card.Title className="workout_card_title">
                Practice workout
              </Card.Title>
              <Card.Text className="workout_card_text">
                Choose your level ranging from beginner to advance.
              </Card.Text>
              <div className="workout_card_selector">
                <DropdownButton
                  className="workout_dropdown"
                  title={workoutLearnRoute.substring(23).slice(1)}
                  onSelect={(e) => {
                    setworkoutLearnRoute(e);
                  }}
                >
                  <Dropdown.Item eventKey="/workout-practice?level=Beginner">
                    {" "}
                    Beginner
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/workout-practice?level=Intermediate">
                    {" "}
                    Intermediate
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/workout-practice?level=Advanced">
                    Advanced
                  </Dropdown.Item>
                </DropdownButton>
                <Button
                  className="GoBtn"
                  onClick={() => navigate(workoutLearnRoute)}
                >
                  GO
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card
            className="show_card"
          >
            <Card.Body>
              <Card.Text className="show_card_text">Learn</Card.Text>
              <Card.Text className="show_card_text">Practice</Card.Text>
              <Card.Text className="show_card_text">Connect</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* <MinimalFooter /> */}
    </div>
  );
}
