import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    readonly id: number;

    @Column({ name: 'control_number' })
    readonly controlNumber: number;

    @Column()
    readonly name: string;

    @Column({ unique: true })
    readonly email: string;

    @Column({name: 'is_verified', default: false})
    readonly isVerified: boolean;

    @CreateDateColumn({ name: 'created_at' })
    readonly createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    readonly updatedAt: Date;
}
