import { useState, useEffect } from "react";
import AuthCode from "react-auth-code-input";
import { verifyOTP } from "../../api/verifyOTP";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function OTPVerify() {
    const [OTP, setOTP] = useState<string>("");
    const [user, setUser] = useState<any | null>(
        JSON.parse(localStorage.getItem("profile")!)
    );
    const navigate = useNavigate();

    const handleChange = (code: string) => {
        setOTP(code);
    };

    const userVerified = () => {
        user.result.verified = true;
        localStorage.setItem("profile", JSON.stringify({ ...user }));
        navigate("/listener");
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")!));
    }, []);

    useEffect(() => {
        if (OTP.length === 4) {
            const userId = user.result._id;
            verifyOTP(userId, OTP).then((res) => {
                if (res.status === "VERIFIED") {
                    userVerified();
                }
            });
        }
    }, [OTP]);

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center gap-4 mt-16'>
                <div>
                    <h1 className='text-center'>Verify your email</h1>
                </div>
                <div>
                    <AuthCode
                        allowedCharacters='numeric'
                        length={4}
                        autoFocus={true}
                        onChange={handleChange}
                        inputClassName={
                            "w-[45px] h-[45px] p-0 text-[24px] text-center mr-[12px] uppercase text-[#494949] border-[1px] border-[#d6d6d6] bg-[#fff] "
                        }
                    />
                </div>
                <div className='text-center'>
                    <p>
                        We have sent code to verify your email on your device
                        gmail account.
                        <br /> Please enter code and verify your email
                    </p>
                </div>
            </div>
        </>
    );
}
