"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function CountUp({ end, duration = 1200, showPlus = false, isVisible }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [end, duration, isVisible]);

    return (
        <Typography variant="h2" component="div" sx={{ fontWeight: 700, fontSize: "2rem" }}>
            {showPlus ? "+" : ""}
            {count.toLocaleString("en-US")}
        </Typography>
    );
}

function FactCard({ value, label, showPlus }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.5 }
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
            observer.disconnect();
        };
    }, []);

    return (
        <Paper
            ref={ref}
            elevation={0}
            sx={{ bgcolor: "transparent", color: "white", p: 2 }}
        >
            <CountUp end={value} showPlus={showPlus} isVisible={isVisible} />
            <Typography variant="h6" sx={{ mt: 1 }}>
                {label}
            </Typography>
        </Paper>
    );
}

export default function FactsSection() {
    const facts = [
        { value: 80000, label: "Connected Devices", showPlus: true },
        { value: 350000, label: "Monthly API requests", showPlus: true },
        { value: 150000, label: "Companies", showPlus: true },
        { value: 15, label: "Countries", showPlus: true },
    ];

    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                py: 10,
                color: "white",
                backgroundImage: "url('/images/your-background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0, 0, 0, 0.69)" }} />

            <Container sx={{ position: "relative", zIndex: 1 }}>
                <Grid container spacing={4} justifyContent="center" textAlign="center">
                    {facts.map((fact) => (
                        <Grid key={fact.label} size={{ xs: 12, sm: 6, md: 3 }}>
                            <FactCard {...fact} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}