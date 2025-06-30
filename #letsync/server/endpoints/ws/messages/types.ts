import { type } from 'arktype';

const DataMessage = type({
	database: [{ cursor: 'string', name: 'string' }, '[]'],
	type: '"data"',
});

const MutationMessage = type({
	database: [{ cursor: 'string', name: 'string' }, '[]'],
	type: '"mutation"',
});

const PingMessage = type({
	type: '"ping"',
});

export const MessageType = DataMessage.or(MutationMessage).or(PingMessage);
