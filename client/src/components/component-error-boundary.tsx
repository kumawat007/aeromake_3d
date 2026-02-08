import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ComponentErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Component error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || <div className="p-4 text-red-500 bg-red-100 rounded">Failed to load component.</div>;
        }

        return this.props.children;
    }
}
