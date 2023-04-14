import app from './api';
import { config } from './config/config'

app.listen(config.PORT, ()=> {
    console.log(`Server is running on ${config.PORT} port`)
},)