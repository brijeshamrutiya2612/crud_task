import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    mobile: "",
  });
  const [error, setError] = useState();

  const sendFormData = async () => {
    const res = await axios.post("http://localhost:5000/api/userdata/add", {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      address: form.address,
      mobile: form.mobile,
    });
    const data = await res.data;
    return data;
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (form.firstname === "") {
      toast.error("Firstname Require");
    } else if (form.lastname === "") {
      toast.error("Lastname Require");
    } else if (form.email === "") {
      toast.error("Email Require");
    } else if (!form.email.includes("@")) {
      toast.error("Please Enter Valid Email");
    } else if (form.address === "") {
      toast.error("address Require");
    } else if (form.mobile === "") {
      toast.error("mobile Require");
    } else if (form.mobile.length !== 10 || form.mobile.length < 5) {
      toast.error("Enter Valid Mobile No");
    } else {
      sendFormData();
      toast.success("Data Successfully Add");
    }
  };
  const reset = () => {
    document.getElementById("crud_form").reset();
  };
  const viewData = () => {
    navigate("/ViewData");
  };
  return (
    <div className="container">
      <Form id="crud_form">
        <Form.Group className="my-4">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Firstname"
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
          />
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Lastname"
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          />
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Address"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Your Mobile No."
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
        </Form.Group>
        <Button onClick={submitForm}>SUBMIT</Button>
        <Button onClick={reset} variant="danger" style={{ marginLeft: "1em" }}>
          RESET
        </Button>
        <Button
          onClick={viewData}
          variant="success"
          style={{ marginLeft: "1em" }}
        >
          VIEW DATA
        </Button>
      </Form>
    </div>
  );
};

export default Add;
