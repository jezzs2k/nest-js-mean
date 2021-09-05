import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { isArray, map } from 'lodash';

import { ApiException } from 'src/shared/api-exception.model';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { ToBooleanPipe } from 'src/shared/pips/to-boolean.pipe';
import { GetOperationId } from 'src/shared/utilities/get-operation-id';
import { UserRole } from 'src/user/models/user-role.enum';
import { ToDoLevel } from './models/todo-level.enum';
import { Todo } from './models/todo.models';
import { TodoParams } from './models/view-models/todo-params.model';
import { TodoVm } from './models/view-models/todoVm.models';
import { TodoService } from './todo.service';

@Controller('todos')
@ApiTags(Todo.modelName)
@ApiBearerAuth()
export class TodoController {
    constructor(private readonly _todoService: TodoService) { }

    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), new RolesGuard(new Reflector()))
    @ApiResponse({ status: HttpStatus.CREATED, type: TodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Todo.modelName, 'Create'))
    async create(@Body() params: TodoParams): Promise<TodoVm> {
        const { content } = params;

        if (!content) {
            throw new HttpException('Content is required', HttpStatus.BAD_REQUEST);
        }

        try {
            const newTodo = await this._todoService.createTodo(params);

            return this._todoService.map<TodoVm>(newTodo);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Get()
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'), new RolesGuard(new Reflector()))
    @ApiResponse({ status: HttpStatus.OK, type: TodoVm, isArray: true })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Todo.modelName, 'GetALl'))
    @ApiQuery({ name: 'level', required: false, isArray: true })
    @ApiQuery({ name: 'isCompleted', required: false })
    async get(@Query('level') level?: ToDoLevel, @Query('isCompleted', new ToBooleanPipe()) isCompleted?: boolean): Promise<TodoVm[]> {
        let filter = {};

        if (level) {
            filter['level'] = { $in: isArray(level) ? [...level] : [level] }
        };

        if (isCompleted !== null) {
            if (filter['level']) {
                filter = {
                    $and: [{ level: filter['level'] }, { isCompleted }]
                }
            } else {
                filter['isCompleted'] = isCompleted;
            }
        }

        try {
            const todos = await this._todoService.findAll(filter);

            return this._todoService.map<TodoVm[]>(map(todos, todo => todo.toJSON()), true)
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Put()
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'), new RolesGuard(new Reflector()))
    @ApiResponse({ status: HttpStatus.CREATED, type: TodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Todo.modelName, 'Create'))
    async update(@Body() vm: TodoVm): Promise<TodoVm> {
        const { id, content, isCompleted, level } = vm;

        if (!vm || !id) {
            throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
        };

        const exist = await this._todoService.findById(id);

        if (!exist) {
            throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
        };

        if (exist.isCompleted) {
            throw new HttpException('Already completed', HttpStatus.BAD_REQUEST);
        };

        exist.content = content;
        exist.isCompleted = isCompleted;
        exist.level = level;

        try {
            const updated = await this._todoService.update(id, exist);

            return this._todoService.map<TodoVm>(updated.toJSON());
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Delete(':id') //req.params.id;
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), new RolesGuard(new Reflector()))
    @ApiResponse({ status: HttpStatus.CREATED, type: TodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Todo.modelName, 'Create'))
    async delete(@Param('id') id: string): Promise<TodoVm> {
        try {
            const deleted = await this._todoService.delete(id);
            return this._todoService.map<TodoVm>(deleted.toJSON())
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

}
