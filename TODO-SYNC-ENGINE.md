# TODO-SYNC-ENGINE.md

## Product Requirements Document (PRD)

### Overview
Implement a real-time sync engine for a multi-tenant application using WebSocket connections. The system must handle tenant-based data isolation, mutation validation, conflict resolution, and efficient change streaming.

### Core Requirements

#### 1. Tenant Isolation
- **Requirement**: All data operations must be scoped to the authenticated user's tenant
- **Implementation**: Use Nile database's tenant isolation features
- **Security**: Prevent cross-tenant data leakage through database-level isolation

#### 2. Real-time Sync
- **Requirement**: Stream data changes to connected clients in real-time
- **Protocol**: WebSocket-based bidirectional communication
- **Efficiency**: Only sync changes after a specific timestamp

#### 3. Mutation Validation
- **Requirement**: All incoming mutations must be validated before processing
- **Schema**: Validate against defined data schemas
- **Business Logic**: Apply business rules and constraints

#### 4. Conflict Resolution
- **Requirement**: Handle concurrent edits from multiple users
- **Strategy**: Last-write-wins with timestamp comparison
- **Notification**: Inform clients of rejected mutations

### Technical Architecture

#### Database Schema Extensions
```sql
-- Change tracking table
CREATE TABLE change_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    tenant_id UUID NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    operation TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    change_data JSONB,
    timestamp TIMESTAMP DEFAULT NOW(),
    user_id UUID NOT NULL
);

-- Mutation queue for processing
CREATE TABLE mutation_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    tenant_id UUID NOT NULL,
    user_id UUID NOT NULL,
    mutation_data JSONB NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
    created_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP
);
```

#### WebSocket Message Protocol
```typescript
// Client to Server Messages
interface SyncRequestMessage {
    type: 'sync_request';
    since_timestamp: number;
    table_filters?: string[];
}

interface MutationMessage {
    type: 'mutation';
    table: string;
    operation: 'insert' | 'update' | 'delete';
    data: Record<string, any>;
    client_timestamp: number;
    temp_id?: string; // For optimistic updates
}

// Server to Client Messages
interface SyncDataMessage {
    type: 'sync_data';
    changes: ChangeRecord[];
    timestamp: number;
}

interface MutationAckMessage {
    type: 'mutation_ack';
    temp_id?: string;
    success: boolean;
    error?: string;
    server_timestamp: number;
}
```

### Implementation Plan

#### Phase 1: Foundation (Agent 1 - Documentation)
- [ ] Complete this PRD document
- [ ] Define detailed API specifications
- [ ] Create database migration scripts
- [ ] Design error handling strategies

#### Phase 2: WebSocket Enhancement (Agent 2)
- [ ] Extend `#letsync/server/endpoints/ws/handlers.ts`
- [ ] Add message routing for sync operations
- [ ] Implement connection state management
- [ ] Add tenant context to WebSocket data

#### Phase 3: Sync Engine Core (Agent 3)
- [ ] Create `#letsync/server/sync/engine.ts` - Main coordinator
- [ ] Create `#letsync/server/sync/changeTracker.ts` - Change detection
- [ ] Create `#letsync/server/sync/mutationValidator.ts` - Validation pipeline
- [ ] Create `#letsync/server/sync/conflictResolver.ts` - Conflict handling

#### Phase 4: Database Integration (Agent 4)
- [ ] Add change tracking triggers to all tables
- [ ] Implement tenant-scoped query utilities
- [ ] Create efficient timestamp-based queries
- [ ] Add mutation queue processing

#### Phase 5: Protocol Implementation (Agent 5)
- [ ] Extend `#letsync/types.ts` with sync message types
- [ ] Implement message serialization/deserialization
- [ ] Add client-side sync protocol handlers
- [ ] Create comprehensive error handling

### Success Criteria

#### Functional Requirements
- [ ] Users can only access their tenant's data
- [ ] Changes are streamed in real-time to connected clients
- [ ] All mutations are validated before database modification
- [ ] Concurrent edits are resolved consistently
- [ ] System maintains performance with multiple connected users

#### Non-Functional Requirements
- [ ] WebSocket connections remain stable for extended periods
- [ ] Database queries execute within 100ms for typical sync operations
- [ ] System can handle 100+ concurrent WebSocket connections
- [ ] Memory usage remains stable during extended operation
- [ ] All tenant data isolation is enforced at database level

### Testing Strategy

#### Unit Tests
- [ ] Message validation and routing
- [ ] Mutation validation logic
- [ ] Conflict resolution algorithms
- [ ] Database query efficiency

#### Integration Tests
- [ ] End-to-end sync workflows
- [ ] Multi-user concurrent editing scenarios
- [ ] Tenant isolation verification
- [ ] WebSocket connection handling

#### Performance Tests
- [ ] Large dataset sync performance
- [ ] High-frequency mutation handling
- [ ] Connection scaling tests
- [ ] Memory leak detection

### Security Considerations

#### Data Protection
- [ ] All database queries are tenant-scoped
- [ ] WebSocket messages are authenticated
- [ ] Sensitive data is not logged
- [ ] Rate limiting on mutation operations

#### Access Control
- [ ] User authentication verified for each operation
- [ ] Tenant membership validated before data access
- [ ] Permission-based operation filtering
- [ ] Audit logging for all data modifications

### Deployment Strategy

#### Development Environment
- [ ] Local Nile database container setup
- [ ] Hot reload support for sync engine changes
- [ ] Debug logging for sync operations
- [ ] Integration with existing development workflow

#### Production Environment
- [ ] Horizontal scaling considerations
- [ ] Database connection pooling
- [ ] WebSocket connection load balancing
- [ ] Monitoring and alerting setup

---

## Agent Task Assignments

### Agent 1: Documentation & Specifications
**Responsibility**: Complete technical specifications and database design
**Deliverables**: 
- Finalized message protocol definitions
- Database migration scripts
- API documentation
- Error handling specifications

### Agent 2: WebSocket Handler Enhancement
**Responsibility**: Enhance existing WebSocket handlers for sync operations
**Files to modify**:
- `#letsync/server/endpoints/ws/handlers.ts`
- `#letsync/types.ts` (message types)

### Agent 3: Sync Engine Core
**Responsibility**: Create the core sync engine infrastructure
**Files to create**:
- `#letsync/server/sync/engine.ts`
- `#letsync/server/sync/changeTracker.ts`
- `#letsync/server/sync/mutationValidator.ts`
- `#letsync/server/sync/conflictResolver.ts`

### Agent 4: Database Integration
**Responsibility**: Implement database-level sync support
**Files to modify/create**:
- Database migration files in `drizzle/`
- Tenant isolation utilities
- Change tracking triggers
- Query optimization

### Agent 5: Protocol Implementation
**Responsibility**: Complete the sync protocol implementation
**Files to modify/create**:
- Extended type definitions in `#letsync/types.ts`
- Client-side sync handlers
- Message serialization utilities
- Comprehensive error handling

---

## Priority Order

1. **High Priority**: Agents 1, 2, 3 (Foundation and core functionality)
2. **Medium Priority**: Agents 4, 5 (Database integration and protocol completion)

Each agent should work independently but coordinate through this document for interface definitions and shared utilities.