import { z } from 'zod';
import weddingData from '@/data/wedding-data.json';

export const rsvpSchema = z.object({
name: z
    .string()
    .min(1, { message: weddingData.nameEmptyError })
    .min(3, { message: weddingData.nameMinError })
    .max(50, { message: weddingData.nameMaxError }),
attendance: z
    .string()
    .min(1, { message: weddingData.attendanceEmptyError }),
guestsCount: z
    .number()
    .min(1, { message: weddingData.guestMinError })
    .max(5, { message: weddingData.guestMaxError }),
message: z
    .string()
    .min(1, { message: weddingData.messageEmptyError })
    .min(5, { message: weddingData.messageMinError })
    .max(300, { message: weddingData.messageMaxError }),
});

export type RSVPFormData = z.infer<typeof rsvpSchema>;