import { Button, Typography } from 'antd';
import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReloadPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.page-layout-offset))] gap-0">
          <Typography.Title
            level={1}
            style={{
              marginBottom: '0.5rem',
              color: '#C71F23',
            }}
          >
            Что-то пошло не так...
          </Typography.Title>
          <Typography.Title
            level={3}
            style={{
              margin: '0',
              marginBottom: '1rem',
              color: '#C71F23',
            }}
          >
            Попробуйте обновить страницу или зайти позже
          </Typography.Title>
          <Button
            onClick={this.handleReloadPage}
            className="bg-[#2A2B34] text-white rounded-lg hover:!bg-[#4C4D5E] hover:!text-slate-200 h-[35.81px] !border-none focus:!outline-none active:!outline-none active:!shadow-none active:!ring-0"
          >
            Обновить страницу
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
