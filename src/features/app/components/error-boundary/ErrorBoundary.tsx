import React, { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface State {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Здесь можно логировать ошибку в сервисы типа Sentry
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <h3 className={styles.errorMessage}>Что-то пошло не так!</h3>
          <p className={styles.errorDescription}>Мы приносим извинения за неудобства</p>
          <p>Попробуйте перезагрузить страницу или свяжитесь с нами.</p>
          <p>Наш телеграм: <a href="https://t.me/elfasatasa">@elfasatasa</a></p>
          <a href="/">Вернуться на главную</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
