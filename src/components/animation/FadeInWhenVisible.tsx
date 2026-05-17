'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInWhenVisibleProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ 
    children, 
    delay = 0.2,
    direction = 'up'
}) => {

    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: { x: 0, y: 0 }
    };

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                ...directions[direction] 
            }}
            whileInView={{ 
                opacity: 1, 
                x: 0, 
                y: 0 
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 1, 
                delay: delay, 
                ease: [0.16, 1, 0.3, 1]
            }}>
            {children}
        </motion.div>
    );
};