import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../api/user.api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

// * styled components
const Hero = tw.div`hero min-h-screen bg-base-200`;
const HeroContent = tw.div`hero-content min-w-full sm:flex-col flex-row-reverse`;
const CardBody = tw.div`card-body`;
const Card = tw.div`card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100`;

const Signin = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const navigate = useNavigate();
	const { setAuthenticated } = useContext(AuthContext);
	const handleSignin = async (data) => {
		try {
			const { accessToken, auth } = await signin(data);
			if (accessToken && auth) {
				setAuthenticated(true);
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("auth", auth);
				toast.success("Signed in successfully!");
			}
		} catch (error) {
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
						<form onSubmit={handleSubmit(handleSignin)}>
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
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder="******"
									className="input input-bordered"
									{...register("password", { required: true })}
								/>
								<div className="flex justify-between items-center">
									<label className="label">
										<Link to="/forgot-password" className="label-text-alt link link-hover">
											Forgot password?
										</Link>
									</label>
									<div className="divider w-4"></div>
									<label className="label">
										<Link to="/signup" className="label-text-alt link link-hover">
											Create new account
										</Link>
									</label>
								</div>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary">Login</button>
							</div>
						</form>
					</CardBody>
				</Card>
			</HeroContent>
		</Hero>
	);
};

export default Signin;
