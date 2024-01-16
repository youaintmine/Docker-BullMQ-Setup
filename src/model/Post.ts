import { Column, DataType, Model, NotEmpty, Table } from "sequelize-typescript";

@Table({
    tableName: Post.POST_TABLE_NAME,
})

export class Post extends Model{
    public static POST_TABLE_NAME = "post" as string;
    public static POST_ID = "id" as string;
    public static POST_NAME = "name" as string;
    public static POST_DESCRIPTION = "description" as string

@Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: Post.POST_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Post.POST_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    field: Post.POST_DESCRIPTION,
  })
  description!: string;
}