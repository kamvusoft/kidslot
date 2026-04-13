# meetup
A simple booking system for daycare providers to manage parents and schedules without WhatsApp chaos.

## User Personas
### Home Daycare Provider
#### Profile
Runs a daycare from home, typically cares for 3–8 children, works independently (no staff), not highly technical, uses phone (SMS, WhatsApp, Facebook groups).

#### Behaviors
Parents message frequently to ask:
* Do you have space tomorrow?
* Can you take my child this week?

Keeps schedule:
* In head ❌
* On paper ❌
* Or basic calendar ❌

#### Goals
* Keep daycare full but not overbooked
* Reduce time spent answering messages
* Have a clear daily schedule
* Look more professional to parents

#### Pain Points
* Constant interruptions from parent messages
* Double bookings or exceeding capacity
* No clear view of how many children are coming each day
* Stress from manual coordination

#### Mindset
“I just want something simple that helps me stay organized without learning complicated software.”

### Parent Booking Childcare
#### Profile
Busy (work, family, errands), uses phone for everything, needs quick, reliable childcare

#### Goals
Quickly know:
* Is there space?
* On which days?
* Book without waiting for replies
* Trust the provider

#### Pain Points
* Waiting for responses
* Unclear availability
* Back-and-forth messages

#### Mindset
"I just want to book a spot quickly and know it’s confirmed.”

### Core Problem
Childcare providers and parents rely on manual messaging to manage bookings, which leads to confusion, wasted time, and scheduling errors.

### Problem Breakdown
#### Problem 1: Messaging Chaos
Everything happens via:
* SMS
* WhatsApp
* Facebook Messenger

👉 Result:
* Lost messages
* Repeated questions
* Constant interruptions

#### Problem 2: No Capacity Management
Providers have limited spots (e.g., 5 kids/day), but no system enforces it.

👉 Result:
* Overbooking
* Or underutilization

#### Problem 3: No Clear Daily View
Providers don't easily see:
* Who is coming today
* How many spots are left

👉 Result:
Stress and mistakes

#### Problem 4: Time-Consuming Booking Process
Typical flow today:
* Parent asks for availability
* Provider checks manually
* Replies
* Confirms

👉 Happens multiple times per day

#### Problem 5: Lack of Professional Experience
* No booking page
* No confirmation system

👉 Result:
* Less trust
* More friction for parents

## First step analysis
### Features
* User Accounts (Providers only)
* Sign up / login
    * Basic profile: Name, Business name, Address, program types (poppy, toddlers, etc.)
    * Customers do NOT need accounts in MVP
* Availability Management
* Public Parent Booking Page
  * Booking request → provider approves
  * Flexible Scheduling Types
    * One-time booking
    * Recurring booking
* Notifications
* Provider Dashboard
* Bussiness website for providers to discover the solution and sign up.
  * Hero
  * Problem
  * Solution
  * Features
  * How it works
  * Social proof
  * Trust
  * Pricing
  * Final Call To Action

### Data model
```
User (Provider)
---------------
id
name
businessName
description
address
availablePrograms
websiteLink
coverImage
```
```
Child
---------------
id
parentName
childName
age
contactInfo
```
```
Booking
---------------
id
date
childId
providerId
status (confirmed / pending)
```
```
Availability
------------
dayOfWeek
maxCapacity
isOpen
```
```
RecurringBooking
----------------
childId
daysOfWeek
startDate
endDate
```

### First Iteration
As a first iteration, we are going to build:
* Bussiness website for providers to discover the solution and sign up.
* Sign up | Basic profile (Name, Business name, Description, Address, Available programs).
* Extended social proof page (filterable registered providers list)