import React from "react";

const NotificationContext = React.createContext({
    notification: [],
    removeLastNotification: () => {},
    addNotification: () => {},
});

const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications]  React.useState([]);

    const removeLastNotification = () => {
        setNotifications((prev) => prev.slice(1));
    };

    const addNotification = () => {
        setNotifications((prev) => [...prev, { ...MessageChannel, key: new Date().getTime()}]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, removeLastNotification, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export { NotificationContext, NotificationProvider };