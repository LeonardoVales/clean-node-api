import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
    private readonly controller: Controller
    // A classe que eu vou decorar tem que ser do mesmo tipo. 
    // O tipo é passado no construtor da classe decorator
    constructor(controller: Controller) {
      this.controller = controller
    }
  
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      await this.controller.handle(httpRequest)    
    //   return httpResponse

    return null
    }
  
  }