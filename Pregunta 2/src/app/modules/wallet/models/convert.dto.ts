import { ZodDto } from '#libs/zod';
import { z } from 'zod';

export class ConvertDto extends ZodDto({
	monedaDestino: z.string(),
	monto: z.coerce.number(),
}) {}

// register DTO OpenApi schema to Swagger
ConvertDto.registerOpenApi();
