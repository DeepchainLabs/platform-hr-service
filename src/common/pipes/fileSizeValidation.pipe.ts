import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileSizeValidation implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return value.size < 1000;
    }
}