import cors from "cors"
import { allowedOrigins } from "./allowedOrigins"

export const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}