import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditData = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    mobile: "",
  });
  useEffect(() => {
    async function getUserById() {
      try {
        const getUserId = await axios.get(
          `http://localhost:5000/api/userdata/${id}`
        );
        setUser(getUserId.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserById();
  }, [id]);
  const onTextFieldChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const sendFormData = async () => {
    const { firstname, lastname, email, address, mobile } = user;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/userdata/update/${id}`,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          address: address,
          mobile: mobile,
        }
      );
    } catch {}
  };
  const updateDate = (e) => {
    e.preventDefault();
    if (user.firstname === "") {
      toast.error("Firstname Require");
    } else if (user.lastname === "") {
      toast.error("Lastname Require");
    } else if (user.email === "") {
      toast.error("Email Require");
    } else if (!user.email.includes("@")) {
      toast.error("Please Enter Valid Email");
    } else if (user.address === "") {
      toast.error("address Require");
    } else if (user.mobile === "") {
      toast.error("mobile Require");
    } else if (user.mobile.length !== 10 || user.mobile.length < 5) {
      toast.error("Enter Valid Mobile No");
    } else {
      sendFormData();
      toast.success("User's Data Updated");
      navigate("/");
    }
  };

  const cancel = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="container">
        <Form id="crud_form">
          <Form.Group className="my-4">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Firstname"
              name="firstname"
              value={user.firstname}
              onChange={(e) => onTextFieldChange(e)}
            />
            {/* {error ? <p style={{ color: "red" }}>{error}</p> : null} */}
          </Form.Group>
          <Form.Group className="my-4">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Lastname"
              value={user.lastname}
              name="lastname"
              onChange={(e) => onTextFieldChange(e)}
            />
            {/* {error ? <p style={{ color: "red" }}>{error}</p> : null} */}
          </Form.Group>
          <Form.Group className="my-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={user.email}
              onChange={(e) => onTextFieldChange(e)}
            />
            {/* {error ? <p style={{ color: "red" }}>{error}</p> : null} */}
          </Form.Group>
          <Form.Group className="my-4">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Address"
              name="address"
              value={user.address}
              onChange={(e) => onTextFieldChange(e)}
            />
            {/* {error ? <p style={{ color: "red" }}>{error}</p> : null} */}
          </Form.Group>
          <Form.Group className="my-4">
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Your Mobile No."
              name="mobile"
              value={user.mobile}
              onChange={(e) => onTextFieldChange(e)}
            />
            {/* {error ? <p style={{ color: "red" }}>{error}</p> : null} */}
          </Form.Group>
          <Button variant="success" onClick={updateDate}>
            UPDATE
          </Button>
          <Button
            variant="danger"
            style={{ marginLeft: "2em" }}
            onClick={cancel}
          >
            CANCEL
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditData;
