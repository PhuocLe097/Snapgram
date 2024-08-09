import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  // dùng gọi toast
  const { toast } = useToast();

  const navigate = useNavigate();

  // setup form (signupValidation dùng để validate cho các field)
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  // Call API đã qua quản lý của mutation
  const { mutateAsync: createUserAccount, isPending: isLoadingCreateUser } =
    useCreateUserAccount();

  const { mutateAsync: signinAccount, isPending: isLoadingSignIn } =
    useSignInAccount();

  // Gọi context để xử lý việc đăng nhập
  const { checkAuthUser, isLoading: isLoadingUser } = useUserContext();

  // Xử lý khi submit form
  async function onSubmit(values: z.infer<typeof signupValidation>) {
    // tạo user mới cho auth và lưu user đó vào db users
    const newUser = await createUserAccount(values);
    console.log("🚀 ~ onSubmit ~ newUser:", newUser);

    // Tạo thất bại thì show thông báo bằng toast
    if (!newUser)
      return toast({
        title: "Sign up failed",
        description: "Something went wrong !!!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

    // Nếu tạo xong account thì login
    const session = await signinAccount({
      email: values.email,
      password: values.password,
    });

    if (!session)
      return toast({
        title: "Login failed",
        description: "Something went wrong !!!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else
      return toast({
        title: "Login failed",
        description: "Something went wrong !!!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-4 sm:pt-10 bg-gradient-to-l from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Create a new account
        </h2>
        <p className="text-light-3 text-[.75rem]">
          To use Snapgram enter your detail
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-purple-400 font-bold text-[1rem] shad-input"
                    type="text"
                    placeholder="Enter your name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-purple-400 font-bold text-[1rem] shad-input"
                    type="email"
                    placeholder="Enter your email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input
                    className="text-purple-400 font-bold text-[1rem] shad-input"
                    type="text"
                    placeholder="Enter your user name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-purple-400 font-bold text-[1rem] shad-input"
                    type="password"
                    placeholder="Enter your password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-gradient-to-l from-[#481FFC] to-[#7a69f7] text-opacity-90 text-[1rem] font-semibold "
          >
            {isLoadingCreateUser || isLoadingSignIn || isLoadingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Submit"
            )}
          </Button>

          <p className="text-[.85rem] text-center text-light-2 mt-2">
            Already have an account? &nbsp;
            <Link to={"/sign-in"} className="text-primary-500 font-bold">
              Login now!
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
