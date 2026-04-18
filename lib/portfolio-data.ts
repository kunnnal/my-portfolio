export const profile = {
  name: "Kunal",
  title: "DevOps Engineer | Cloud Engineer | Automation Builder",
  tagline: "Building scalable systems, automating everything.",
  description:
    "I design cloud infrastructure, container platforms, and release pipelines that keep systems reliable while making delivery faster for teams.",
  email: "kunal.devops@example.com",
  linkedin: "https://www.linkedin.com/in/kunal-devops",
  github: "https://github.com/kunal-devops",
  commandStrip: [
    "terraform apply",
    "kubectl rollout status",
    "gh workflow run deploy",
    "grafana dashboards"
  ],
  heroSignals: [
    {
      label: "Cloud Foundation",
      value: "AWS-first architecture"
    },
    {
      label: "Release Strategy",
      value: "CI/CD with guardrails"
    },
    {
      label: "Operations",
      value: "Metrics, logs, uptime"
    }
  ],
  focusAreas: [
    "IaC-first environments with reusable Terraform modules",
    "Containerized deployments across EKS, ECS, and Linux workloads",
    "Observability built into delivery, not added later"
  ]
};

export const aboutHighlights = [
  {
    title: "Infrastructure over theory",
    description:
      "I prefer building working platforms, pipelines, and recovery paths over collecting purely conceptual knowledge."
  },
  {
    title: "Automation mindset",
    description:
      "If a process repeats, I look for a safer, scripted, versioned path that reduces manual drift."
  },
  {
    title: "Reliability as identity",
    description:
      "My best work sits between developer speed and operational stability, where tooling should support both."
  }
];

export const skillGroups = [
  {
    category: "Cloud",
    summary: "Production-minded AWS building blocks for resilient environments.",
    items: ["AWS", "EKS", "EC2", "S3", "RDS", "VPC"]
  },
  {
    category: "Containers",
    summary: "Portable runtimes and orchestration for service-based systems.",
    items: ["Docker", "Kubernetes", "Helm", "Container Networking"]
  },
  {
    category: "Infrastructure as Code",
    summary: "Repeatable provisioning with reviewable changes and environment parity.",
    items: ["Terraform", "Remote State", "Module Design", "Secrets Strategy"]
  },
  {
    category: "CI/CD",
    summary: "Fast, observable delivery pipelines with approval and rollback patterns.",
    items: ["GitHub Actions", "Jenkins", "Artifact Flow", "Release Gates"]
  },
  {
    category: "Monitoring",
    summary: "Operational visibility across metrics, alerts, and dashboards.",
    items: ["Prometheus", "Grafana", "Alerting", "SLO Thinking"]
  },
  {
    category: "Operating Systems",
    summary: "Linux-first workflows for automation, troubleshooting, and runtime control.",
    items: ["Linux", "Shell Scripting", "Systemd", "Network Debugging"]
  }
];

export const projects = [
  {
    title: "AWS EKS Cluster Setup",
    description:
      "Provisioned a scalable Kubernetes control plane on AWS with node groups, ingress, and secure network boundaries for service deployment.",
    stack: ["AWS", "EKS", "Terraform", "Kubernetes"],
    impact: "Multi-environment cluster baseline with repeatable provisioning.",
    github: "https://github.com/kunal-devops/aws-eks-cluster-setup"
  },
  {
    title: "Terraform Infrastructure Suite",
    description:
      "Built a reusable Terraform stack for VPC, public and private subnets, bastion access, and managed database resources with environment separation.",
    stack: ["Terraform", "AWS", "RDS", "VPC"],
    impact: "Versioned infrastructure foundation with reduced config drift.",
    github: "https://github.com/kunal-devops/terraform-infra-suite"
  },
  {
    title: "CI/CD Pipeline Implementation",
    description:
      "Automated test, build, image publishing, and deployment stages with rollback-aware workflows and observable status checks.",
    stack: ["GitHub Actions", "Jenkins", "Docker", "AWS"],
    impact: "Faster release cadence and fewer manual deployment steps.",
    github: "https://github.com/kunal-devops/cicd-pipeline-implementation"
  },
  {
    title: "ECS Microservices Deployment",
    description:
      "Containerized application services and deployed them behind a managed AWS runtime with secure networking, autoscaling, and health checks.",
    stack: ["AWS ECS", "Docker", "ALB", "CloudWatch"],
    impact: "Operationally simple microservice rollout path for smaller teams.",
    github: "https://github.com/kunal-devops/ecs-microservices-deployment"
  }
];

export const journey = [
  {
    period: "Phase 01",
    title: "Linux and networking groundwork",
    description:
      "Started with command-line administration, process control, file systems, and the network behavior that later shaped infrastructure decisions.",
    markers: ["Linux", "Shell", "TCP/IP"]
  },
  {
    period: "Phase 02",
    title: "Cloud and AWS hands-on labs",
    description:
      "Moved from static local setups to AWS labs focused on EC2, S3, IAM, VPC design, and the tradeoffs between convenience and control.",
    markers: ["AWS", "IAM", "VPC"]
  },
  {
    period: "Phase 03",
    title: "Infrastructure as code and containers",
    description:
      "Shifted into Terraform modules, Dockerized workloads, and Kubernetes concepts to remove configuration drift and standardize runtime behavior.",
    markers: ["Terraform", "Docker", "Kubernetes"]
  },
  {
    period: "Phase 04",
    title: "Delivery automation and observability",
    description:
      "Built CI/CD pipelines and monitoring dashboards so deployment velocity and system insight improved together instead of competing.",
    markers: ["GitHub Actions", "Prometheus", "Grafana"]
  }
];

export const contactChannels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kunal-devops",
    href: profile.linkedin
  },
  {
    label: "GitHub",
    value: "github.com/kunal-devops",
    href: profile.github
  }
];
