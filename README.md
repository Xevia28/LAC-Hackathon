# LAC-Hackathon

This is basically a database management system for the Legal Aid Center(LAC) to help people that can't afford private lawyers for their cases. We'll be using MERN stack for this project.

## Workflow Summary

    Client Registration:
        A person seeking legal aid signs up to the system as a client.
        During registration, they provide necessary personal details and create a profile.

    Case Creation:
        The client logs into their account and creates a new case (application).
        They enter case details, upload relevant documents, and submit the case for review.

    Admin Review and Assignment:
        An Admin logs into the system and reviews the submitted case details.
        The Admin assigns the case to an appropriate Legal Advisor based on expertise, workload, and availability.
        The system sends a notification to the assigned Legal Advisor about the new case assignment.

    Legal Advisor Management:
        The Legal Advisor logs into the system and views their assigned cases.
        They can update case details, add notes, and upload additional documents as needed.
        The Legal Advisor communicates with the client for further details and updates on the case through the system’s messaging feature.

    Client Interaction and Case Tracking:
        The client can log in at any time to view the status and details of their case.
        They receive notifications about any updates made by the Legal Advisor.
        Clients can communicate with their Legal Advisor via the system for any follow-ups or additional information.

    Calendar and Notifications:
        The system includes a calendar feature for scheduling important dates related to the case (e.g., court dates, meetings).
        Automated reminders and notifications are sent to clients and Legal Advisors about upcoming appointments and deadlines.

    Admin Responsibilities:
        The Admin is responsible for registering new Legal Advisors and managing user accounts.
        They oversee the overall functioning of the system, generate reports, and ensure data security and privacy.

## Detailed Breakdown of Functionalities

- Client Registration and Case Creation

  Client Registration: A form for new clients to sign up, including fields for personal information (name, contact details, etc.).
  Case Creation: A form for clients to create new cases, including fields for case description, type, and document upload.

- Admin Review and Case Assignment

  Admin Dashboard: A dashboard for Admins to view and manage all submitted cases.
  Case Assignment: An interface to assign cases to Legal Advisors, showing details about available Legal Advisors and their current caseloads.

- Legal Advisor Management and Communication

  Legal Advisor Dashboard: A dashboard for Legal Advisors to view their assigned cases, with options to update case details, add notes, and upload documents.
  Communication: A secure messaging system for Legal Advisors to communicate with clients regarding their cases.

- Client Interaction and Case Tracking

  Client Dashboard: A dashboard for clients to view the status and details of their cases, including any updates made by the Legal Advisor.
  Notifications: Automated notifications sent to clients about case updates and important dates.

- Calendar and Notifications

  Calendar Feature: An integrated calendar to schedule and track important dates related to cases.
  Automated Reminders: Automated email or SMS reminders for clients and Legal Advisors about upcoming appointments, court dates, and deadlines.

- Admin Responsibilities

  User Management: Forms and interfaces for the Admin to register new Legal Advisors, manage user accounts, and assign roles.
  System Oversight: Tools for the Admin to monitor system usage, generate reports, and ensure data security.
