
import connectDB from "../../../../libs/connect-db";
import { deleteNote, getNote, UpdateNote } from "../../../../libs/note-db";
import { createErrorResponse } from "../../../../libs/utils";
import { type NextResponse } from 'next/server';

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const id = params.id;
        const { note, error } = await getNote(id);

        if (error) {
            throw error;
        }

        let json_response = {
            status: "success",
            data: {
                note,
            },
        };
        return Response.json(json_response);
    } catch (error: any) {
        if (typeof error === "string" && error.includes("Note not found")) {
            return createErrorResponse("Note not found", 404);
        }

        return createErrorResponse(error.message, 500);
    }
}


export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const id = params.id;
        let body = await request.json();

        const { note, error } = await UpdateNote(id, body);

        if (error) {
            throw error;
        
        }

        let json_response = {
            status: "success",
            data: {
                note,
            },
        };
        return Response.json(json_response);
    } catch (error: any) {
        if (typeof error === "string" && error.includes("Note not found")) {
            return createErrorResponse("Note not found", 404);
        }

        return createErrorResponse(error.message, 500);
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const id = params.id;
        const { error } = await deleteNote(id);

        if (error) {
            throw error;
        }

        return new Response(null, { status: 204 });
    } catch (error: any) {
        if (typeof error === "string" && error.includes("Note not found")) {
            return createErrorResponse("Note not found", 404);
        }

        return createErrorResponse(error.message, 500);
    }
}
