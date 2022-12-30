import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signup } from "../api/user.api";
import { useState } from "react";
import { toast } from "react-toastify";

// * styled components
const Hero = tw.div`hero min-h-screen bg-base-200`;
const HeroContent = tw.div`hero-content min-w-full sm:flex-col flex-row-reverse`;
const CardBody = tw.div`card-body`;
const Card = tw.div`card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100`;

const Signup = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [isSuccess, setIsSuccess] = useState(false);
	const navigate = useNavigate();
	const handleSignup = async (data) => {
		try {
			console.log(data);
			const response = await signup(data);
			console.log(response);
			if (response?.status === 200) {
				navigate("/signin");
				toast.success("Check your email to get activate link!");
			}
		} catch (error) {
			setIsSuccess(false);
			console.log(error.message);
		}
	};

	return (
		<Hero>
			<HeroContent>
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login now!</h1>
					<p className="py-6 text-xl">
						Create account for free. Chat with your friend anytime, anywhere. <br /> Connecting people around the world!
					</p>
				</div>
				<Card>
					<CardBody>
						<form onSubmit={handleSubmit(handleSignup)}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									placeholder="example@email.com"
									className="input input-bordered"
									{...register("email", { required: true })}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Name</span>
								</label>
								<input
									type="text"
									placeholder="Your name"
									className="input input-bordered"
									{...register("username", { required: true })}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder="******"
									className="input input-bordered"
									{...register("password", { required: true })}
								/>
								<label className="label">
									<Link to="/forgot-password" className="label-text-alt link link-hover">
										Forgot password?
									</Link>
								</label>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary">Create new Account</button>
							</div>
						</form>
					</CardBody>
				</Card>
			</HeroContent>
		</Hero>
	);
};

export default Signup;
