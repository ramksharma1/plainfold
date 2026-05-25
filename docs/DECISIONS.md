# Architecture Decision Records

This document captures significant technical decisions made while building Plainfold. Each entry follows the [ADR](https://adr.github.io/) format: context, decision, and consequences.

---

## ADR-001: Use MongoDB (Document Store) Instead of PostgreSQL (Relational)

**Date:** 2026-05-23
**Status:** Accepted

### Context

Plainfold needs to persist debt records, each of which has flexible nested data:

- A debt has a primary creditor, but may have a **chain of custody** (e.g., original creditor → charge-off → collection agency → second collection agency). The number of entries in that chain is variable and unknown at design time.
- Each debt may eventually have associated **payment history** entries, status changes over time, and notes — also variable in count.
- Future versions will allow users to attach **parsed credit report metadata** to a debt, including bureau-specific fields that differ between Experian, Equifax, and TransUnion.

A relational schema would require either:
- Multiple join tables for each piece of nested data (chain_of_custody, status_history, payment_history, etc.), with foreign keys and joins on every read, OR
- JSON columns in PostgreSQL, which negates much of the type-safety advantage of using a relational database in the first place.

### Decision

Use **MongoDB Atlas** with **Mongoose** as the ODM layer.

### Reasoning

1. **Document model maps naturally to debt records.** A single MongoDB document can hold a debt's nested fields (chain of custody as an array, parsed report data as a subdocument) without joins or extra tables.
2. **Schema validation is still enforced.** Mongoose provides schema-level validation (required fields, enums, min/max), so we keep the data-integrity benefits of a typed schema without the rigidity of fixed relational tables.
3. **Free tier is generous.** MongoDB Atlas offers 512MB free forever, sufficient for v1 and well beyond. No infrastructure to manage.
4. **The MERN stack pairs cleanly.** Mongoose and Express are designed to work together; using JSON end-to-end (from MongoDB through Express to React) eliminates the need for serialization mapping layers.
5. **Learning value.** Document databases are widely used in modern web development; building on MongoDB gives transferable skills for many JavaScript-stack roles.

### Trade-offs Accepted

- **No SQL JOINs.** Complex queries that span multiple collections require either application-level joins or MongoDB's `$lookup` aggregation, which is less ergonomic than `JOIN` in SQL. This is acceptable because Plainfold's queries are mostly single-document operations on the `debts` collection.
- **No transactions across collections by default.** Multi-document transactions require explicit setup. Not currently needed for Plainfold's use cases.
- **Eventual consistency model.** MongoDB Atlas free-tier replicas are eventually consistent. For a single-user personal finance app, this is not a concern.

### Alternatives Considered

- **PostgreSQL** — Rejected primarily for the schema rigidity around nested debt history. Would have been a fine choice for a different shape of data.
- **SQLite** — Rejected because it doesn't scale beyond a single machine; not viable for a deployed multi-user product.
- **Firebase Firestore** — Rejected to avoid vendor lock-in to Google's ecosystem and to maintain control over the data layer.

---