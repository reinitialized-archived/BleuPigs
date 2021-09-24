import http from 'http'
import { CustomRequest, CustomResponse, Middlepoint, Preprocessor, RegisterMiddlepoint } from '../mas.js'

const serverOptions: http.ServerOptions = {
	IncomingMessage: CustomRequest,
	ServerResponse: CustomResponse,
}

const middlepoint = new Middlepoint({
	hello() {
		return 'Hello from mas.js'
	},
})

RegisterMiddlepoint(middlepoint)

const server = http.createServer(serverOptions)

server.on('request', Preprocessor)

server.listen(process.env.PORT || 3001, () => {
	console.log(`Server running`)
})
