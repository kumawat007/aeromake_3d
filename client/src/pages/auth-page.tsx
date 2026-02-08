import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertUserSchema, InsertUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu } from "lucide-react";

export default function AuthPage() {
    const { user, loginMutation, registerMutation } = useAuth();
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (user) {
            setLocation("/");
        }
    }, [user, setLocation]);

    const loginForm = useForm<InsertUser>({
        resolver: zodResolver(insertUserSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const registerForm = useForm<InsertUser>({
        resolver: zodResolver(insertUserSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="flex items-center justify-center p-8 bg-background">
                <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-xl">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Cpu className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight text-foreground">
                                Aero<span className="text-primary">Make</span>
                            </span>
                        </div>
                        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                        <CardDescription>
                            Sign in to your account or create a new one
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="register">Register</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login">
                                <Form {...loginForm}>
                                    <form
                                        onSubmit={loginForm.handleSubmit((data) =>
                                            loginMutation.mutate(data),
                                        )}
                                        className="space-y-4"
                                    >
                                        <FormField
                                            control={loginForm.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={loginMutation.isPending}
                                        >
                                            Sign In
                                        </Button>
                                    </form>
                                </Form>
                            </TabsContent>

                            <TabsContent value="register">
                                <Form {...registerForm}>
                                    <form
                                        onSubmit={registerForm.handleSubmit((data) =>
                                            registerMutation.mutate(data),
                                        )}
                                        className="space-y-4"
                                    >
                                        <FormField
                                            control={registerForm.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={registerForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={registerMutation.isPending}
                                        >
                                            Create Account
                                        </Button>
                                    </form>
                                </Form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
            <div className="hidden lg:block relative overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background z-10" />
                <img
                    src="https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070&auto=format&fit=crop"
                    alt="Drone racing"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-0 left-0 right-0 p-12 z-20 bg-gradient-to-t from-background via-background/80 to-transparent">
                    <h2 className="text-4xl font-bold mb-4">
                        Build, Race, <span className="text-primary">Win</span>
                    </h2>
                    <p className="text-lg text-muted-foreground/80 max-w-md">
                        The premium marketplace for drone enthusiasts, 3D printing services,
                        and custom parts. Join the community today.
                    </p>
                </div>
            </div>
        </div>
    );
}
