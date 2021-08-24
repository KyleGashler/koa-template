import { BaseContext } from 'koa';
import { description, request, summary, tagsAll } from 'koa-swagger-decorator';

@tagsAll(['Home'])
export default class HomeController {
    @request('get', '/')
    @summary('Landing page')
    @description('Landing page for the app')
    public static async helloWorld(ctx: BaseContext): Promise<void> {
        ctx.body = 'Hello World!';
    }
}
