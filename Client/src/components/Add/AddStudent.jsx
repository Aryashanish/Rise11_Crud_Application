import React, { useContext, useState} from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { UserContext } from "../../Context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const navigate = useNavigate();
    const userInfo = useContext(UserContext);
    const [eventInfo, seteventInfo] = useState({});

    function clickHandler(e) {
        seteventInfo((lastvalue) => {
          return {
              ...lastvalue,
            [e.target.name]: e.target.value,
          };
        });
    }

    function postedBlog(e) {
        e.preventDefault();
        seteventInfo((lastvalue) => {
            return {
                ...lastvalue,
            };
        });
        
        console.log(eventInfo);
        axios.post('http://localhost:8000/employee/add', eventInfo)
            .then((res) => {
                console.log("Successfull add", res.data.msg);
                navigate('/event');
            })
            .catch((err) => {
                console.log("Error ", err);
            })

    };



    return (
        <>
            <div className="grid place-content-center mt-5 p-6">
                <h1 className="text-center font-semibold text-2xl text-orange-700">New Employee Details</h1>
                <form className="mt-4" onSubmit={postedBlog}>
                    <div>
                        <label>Name</label>
                        <Input
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            onChange={clickHandler}
                        />
                    </div>
                    <div>
                        <label className="">Email</label>
                        <Input
                            type="text"
                            placeholder="Enter Email id"
                            name="email"
                            onChange={clickHandler}
                    />
                    </div>
                    <div>
                        <label className="">Phone</label>
                        <Input
                            type="text"
                            placeholder="Enter Phone No"
                            name="phone"
                            onChange={clickHandler}
                    />
                    </div>
                    <div>
                        <label className="">Designation</label>
                        <Input
                            type="text"
                            placeholder="Enter Designation"
                            name="position"
                            onChange={clickHandler}
                    />
                    </div>
                    <div>
                        <label className="">Qualification</label>
                        <Input
                            type="text"
                            placeholder="Enter Qualification"
                            name="qualification"
                            onChange={clickHandler}
                    />
                    </div>
                    <div>
                        <Button value="Post"></Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddStudent;