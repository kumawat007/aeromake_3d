import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="max-w-md w-full bg-card border border-destructive/20 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center gap-3 text-destructive mb-4">
                            <AlertCircle className="w-8 h-8" />
                            <h2 className="text-xl font-bold">Something went wrong</h2>
                        </div>

                        <p className="text-muted-foreground mb-4">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>

                        <div className="bg-muted/50 p-3 rounded-md mb-6 overflow-auto max-h-32">
                            <code className="text-xs text-muted-foreground font-mono">
                                {this.state.error?.message || "Unknown error"}
                            </code>
                        </div>

                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full"
                        >
                            Refresh Page
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
