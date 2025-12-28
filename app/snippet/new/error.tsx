'use client'

interface ErrorPageType{
    error: Error,
    reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageType) {
    return <div>{ error.message }</div>
}