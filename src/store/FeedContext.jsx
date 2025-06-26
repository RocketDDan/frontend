import { createContext, useContext, useState } from "react";

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [lastViewedFeedId, setLastViewedFeedId] = useState(null);
    return (
        <FeedContext.Provider value={{ lastViewedFeedId, setLastViewedFeedId }}>
            {children}
        </FeedContext.Provider>
    );
};

export const useFeed = () => useContext(FeedContext);