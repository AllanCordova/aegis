# Aegis - Ritual Compute Dashboard

Aegis is a sophisticated frontend application designed to monitor and manage Ritual's AI and blockchain infrastructure. This dashboard provides real-time visualization of distributed compute resources, node operations, and protocol interactions, making complex decentralized systems more accessible and manageable.

## Project Overview

Aegis empowers developers and operators to interact with Ritual's infrastructure through intuitive interfaces. The platform provides comprehensive monitoring capabilities for:

- **Node Operations**: Real-time monitoring of infernet nodes across the Ritual chain
- **Compute Resources**: Live telemetry for CPU, memory, and container health
- **Transaction Monitoring**: Visualization of transaction lifecycles across Ritual's infrastructure
- **Earnings Tracking**: Real-time tracking of estimated earnings and rewards
- **Network Metrics**: Latency monitoring and network performance analytics

## Key Features

### Real-Time Monitoring
- Live performance metrics with auto-updating dashboards
- Real-time CPU and memory usage visualization
- Container health monitoring and status tracking
- Network latency and uptime tracking

### Web3 Integration
- Seamless wallet connection via RainbowKit
- Multi-chain support (Ethereum, Polygon, Arbitrum, Optimism, Base)
- Secure blockchain interactions using wagmi and viem
- Cross-chain transaction flow visualization

### Dashboard Components
- **Metrics Grid**: Overview of active nodes, compute jobs, network latency, and earnings
- **Usage Charts**: Real-time performance charts with live data feeds
- **Activity Logs**: Recent activity tracking and event monitoring
- **Responsive Design**: Optimized for desktop and mobile experiences

## Tech Stack

### Core Technologies
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4

### Web3 & Blockchain
- **Wallet Integration**: RainbowKit 2.2.10
- **Ethereum Library**: wagmi 2.19.5, viem 2.44.2
- **State Management**: TanStack Query 5.90.17

### Data Visualization
- **Charts**: Recharts 3.6.0
- **Icons**: Lucide React 0.562.0

### Testing
- **Test Framework**: Jest 30.2.0
- **Testing Utilities**: React Testing Library 16.3.1
- **Test Environment**: jsdom

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- A Web3 wallet (MetaMask, WalletConnect, etc.)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aegis
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_ENABLE_TESTNETS=false
# Add your WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Testing

The project includes comprehensive unit tests for components, hooks, and utilities:

```bash
npm test
```

### Test Coverage

- **Components**: Dashboard components with mocked dependencies
- **Hooks**: Custom React hooks for metrics and real-time data
- **Utilities**: Mock data generators and helper functions

Test files are located in the `__tests__` directory:
- `__tests__/components/` - Component tests
- `__tests__/hooks/` - Hook tests
- `__tests__/unit/` - Utility function tests

## Project Structure

```
aegis/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles
├── components/
│   ├── dashboards/        # Dashboard components
│   │   ├── MetricsGrid.tsx
│   │   └── UsageChart.tsx
│   ├── layouts/           # Layout components
│   │   └── Header.tsx
│   └── Provider.tsx       # Web3 providers setup
├── hooks/                 # Custom React hooks
│   ├── useDashboardMetrics.ts
│   └── useRealTimeMetrics.ts
├── lib/                   # Utility functions
│   └── mock-generator.ts
├── data/                  # Static data
│   └── metrics-data.ts
└── __tests__/             # Test files
    ├── components/
    ├── hooks/
    └── unit/
```

## Development

### Code Quality

- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **Formatting**: Consistent code style across the project

### Key Development Patterns

- **Custom Hooks**: Reusable logic for metrics and real-time data
- **Component Composition**: Modular, reusable dashboard components
- **Type Safety**: Full TypeScript coverage
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Supported Networks

- Ethereum Mainnet
- Polygon
- Arbitrum
- Optimism
- Base
- Sepolia (testnet, optional)

## Features in Detail

### Metrics Dashboard
- Active node count tracking
- Total compute jobs processed
- Network latency monitoring
- Estimated earnings with real-time updates

### Real-Time Charts
- CPU usage visualization
- Memory consumption tracking
- Live data feed with configurable update intervals
- Smooth animations and transitions

### Web3 Wallet Integration
- Multiple wallet support (MetaMask, WalletConnect, Coinbase, etc.)
- Secure connection handling
- Account balance and network switching
- Transaction status monitoring

