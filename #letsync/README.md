# Sync Engine Core

## Architecture Overview

The sync engine is composed of four main components:

### 1. Engine (`engine.ts`)
**Main sync engine coordinator** that orchestrates sync operations
- Handles incoming sync requests and mutations from WebSocket clients
- Coordinates between all other components
- Manages message routing and response generation
- Provides health checking and monitoring

**Key Functions:**
- `handleSyncRequest()` - Process client sync requests
- `handleMutation()` - Validate and execute data mutations
- `broadcastChanges()` - Broadcast changes to connected clients
- `getHealthStatus()` - System health monitoring

### 2. Change Tracker (`changeTracker.ts`)
**Database change detection system** for tracking data modifications
- Efficient timestamp-based change retrieval
- Change logging for audit trails
- Optimized queries for sync operations

**Key Functions:**
- `getChangesSince()` - Retrieve changes since timestamp
- `recordChange()` - Log data modifications
- `getChangesForRecord()` - Get change history for specific records
- `cleanupOldChanges()` - Maintenance operations

### 5. Tenant Isolation (`tenantIsolation.ts`)
**Tenant-based data filtering utilities** for Nile database
- Multi-tenant data security
- Tenant-scoped operations
- Access control enforcement
- Database operation isolation

**Key Functions:**
- `getTenantIdForUser()` - User-tenant mapping
- `executeTenantScopedMutation()` - Secure data operations
- `validateUserTenantAccess()` - Access validation
- Tenant context management

## Usage Examples

### Basic Health Check
```typescript
import { syncEngineHealthCheck } from '#letsync/server/sync';

const health = await syncEngineHealthCheck();
console.log('Sync engine status:', health.status);
```

## Think:

- Conflict Resolution

## Error Handling

All components implement comprehensive error handling with:
- Structured error types in `#letsync/types.ts`
- Health check endpoints for monitoring
- Graceful degradation strategies
- Detailed logging for debugging

## Performance Considerations

- **Batched Operations**: Changes are retrieved in configurable batches
- **Timestamp Indexing**: Efficient queries based on timestamp ranges
- **Tenant Scoping**: All queries are automatically tenant-isolated
- **Connection Pooling**: Database connections are managed efficiently
