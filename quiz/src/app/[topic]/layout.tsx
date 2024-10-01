import React from "react";

export function generateMetadata({ params }: { params: { topic: string } }) {
    const { topic } = params; 

    return {
        title: topic
    }
}

export default function TopicLayout({ children }: {
    children: React.ReactNode
}) {
    return <>{children}</>
}