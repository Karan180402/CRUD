import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    // Add a token field to store the JWT
    @Column({ nullable: true })  // Make it nullable for users without a token
    token: string;
}
