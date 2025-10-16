// Chart instances
let charts = {};
let currentUser = null;

// Authentication functions
function showLogin() {
    console.log('showLogin function called');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('signupPage').classList.add('hidden');
    document.getElementById('mainApp').classList.add('hidden');
    console.log('Login page should now be visible');
}

function showSignup() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('signupPage').classList.remove('hidden');
    document.getElementById('mainApp').classList.add('hidden');
}

function login(event) {
    event.preventDefault();
    currentUser = {
        name: 'John Doe',
        email: 'john.doe@pharma.com',
        role: 'GTN Analyst',
        company: 'Pharma Corp'
    };
    showMainApp();
}

function signup(event) {
    event.preventDefault();
    currentUser = {
        name: document.querySelector('#signupPage input[type="text"]').value,
        email: document.querySelector('#signupPage input[type="email"]').value,
        role: 'New User',
        company: 'New Company'
    };
    showMainApp();
}

function showMainApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('signupPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    
    // Update profile information
    if (currentUser) {
        document.querySelector('.profile-icon').textContent = currentUser.name.split(' ').map(n => n[0]).join('');
        document.querySelector('.profile-dropdown-item span:last-child').textContent = currentUser.name;
        document.querySelectorAll('.profile-dropdown-item span:last-child')[1].textContent = currentUser.email;
        document.querySelectorAll('.profile-dropdown-item span:last-child')[2].textContent = currentUser.role;
    }
}

function logout() {
    console.log('Logout function called');
    currentUser = null;
    // Reset all charts
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    });
    charts = {};
    // Close profile dropdown
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
    // Redirect to login page
    console.log('Calling showLogin()');
    showLogin();
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Add active class to clicked nav item
    event.target.classList.add('active');

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        'gtn-optimization': 'GTN Optimization - 5 Pillars',
        'readiness-assessment': 'Readiness Assessment',
        'contract-optimization': 'Contract Optimization',
        'revenue-leakage': 'Revenue Leakage Analysis',
        'data-management': 'Data Management',
        'transformation-roadmap': 'Transformation Roadmap',
        'devops-capabilities': 'DevOps Capabilities',
        'impact-measurement': 'Impact Measurement',
        analytics: 'Advanced Analytics',
        reports: 'Reports',
        settings: 'Settings',
        calculator: 'GTN Calculator'
    };
    document.getElementById('page-title').textContent = titles[pageId] || 'ValuForge';

    // Initialize charts when pages are shown
    if (pageId === 'kpi') {
        initializeKPICharts();
    } else if (pageId === 'analytics') {
        initializeAnalyticsCharts();
    } else if (pageId === 'revenue-leakage') {
        initializeRevenueLeakageChart();
    }
}

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('active');
}

// Close profile dropdown when clicking outside
document.addEventListener('click', function(event) {
    const profileIcon = document.querySelector('.profile-icon');
    const dropdown = document.getElementById('profileDropdown');
    
    if (!profileIcon.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

function calculateROI() {
    const currentRevenue = parseFloat(document.getElementById('currentRevenue').value) || 100;
    const optimizationImpact = parseFloat(document.getElementById('optimizationImpact').value) || 15;
    const implementationCost = parseFloat(document.getElementById('implementationCost').value) || 5;
    const timePeriod = parseFloat(document.getElementById('timePeriod').value) || 3;

    const additionalRevenue = (currentRevenue * optimizationImpact / 100) * timePeriod;
    const netBenefit = additionalRevenue - implementationCost;
    const roi = (netBenefit / implementationCost) * 100;

    document.getElementById('roiValue').textContent = roi.toFixed(0) + '%';
    document.getElementById('additionalRevenue').textContent = additionalRevenue.toFixed(0) + 'M';
    document.getElementById('netBenefit').textContent = netBenefit.toFixed(0) + 'M';
}

function initializeRevenueLeakageChart() {
    const ctx = document.getElementById('revenueLeakageChart');
    if (ctx && !charts.revenueLeakage) {
        charts.revenueLeakage = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Pricing Discrepancies', 'Contract Non-compliance', 'Data Entry Errors', 'Process Inefficiencies', 'Regulatory Changes'],
                datasets: [{
                    label: 'Revenue Leakage ($M)',
                    data: [2.5, 1.8, 1.2, 0.8, 0.5],
                    backgroundColor: [
                        '#ff4d4f',
                        '#faad14',
                        '#faad14',
                        '#52c41a',
                        '#1890ff'
                    ],
                    borderColor: [
                        '#ff4d4f',
                        '#faad14',
                        '#faad14',
                        '#52c41a',
                        '#1890ff'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'M';
                            }
                        }
                    }
                }
            }
        });
    }
}

function initializeKPICharts() {
    // Revenue Trend Chart
    const revenueCtx = document.getElementById('revenueTrendChart');
    if (revenueCtx && !charts.revenueTrend) {
        charts.revenueTrend = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Gross Revenue',
                    data: [2200, 2350, 2100, 2500, 2800, 2700, 2900, 3100, 2950, 3200],
                    borderColor: '#1890ff',
                    backgroundColor: 'rgba(24, 144, 255, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Net Revenue',
                    data: [1650, 1763, 1575, 1875, 2100, 2025, 2175, 2325, 2213, 2400],
                    borderColor: '#52c41a',
                    backgroundColor: 'rgba(82, 196, 26, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    // Discount Distribution Chart
    const discountCtx = document.getElementById('discountDistributionChart');
    if (discountCtx && !charts.discountDistribution) {
        charts.discountDistribution = new Chart(discountCtx, {
            type: 'doughnut',
            data: {
                labels: ['Base Discount', 'Volume Discount', 'Prompt Payment', 'Cash Discount', 'Trade Discount', 'Rebates'],
                datasets: [{
                    data: [35, 25, 15, 10, 8, 7],
                    backgroundColor: [
                        '#1890ff',
                        '#52c41a',
                        '#faad14',
                        '#ff4d4f',
                        '#722ed1',
                        '#13c2c2'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // KPI Comparison Chart
    const kpiCtx = document.getElementById('kpiComparisonChart');
    if (kpiCtx && !charts.kpiComparison) {
        charts.kpiComparison = new Chart(kpiCtx, {
            type: 'radar',
            data: {
                labels: ['GTN Accuracy', 'Processing Speed', 'Error Rate', 'User Satisfaction', 'Revenue Growth', 'Cost Efficiency'],
                datasets: [{
                    label: 'Current Performance',
                    data: [98.7, 95, 85, 92, 88, 90],
                    borderColor: '#1890ff',
                    backgroundColor: 'rgba(24, 144, 255, 0.2)'
                }, {
                    label: 'Target Performance',
                    data: [99, 98, 95, 95, 95, 95],
                    borderColor: '#52c41a',
                    backgroundColor: 'rgba(82, 196, 26, 0.2)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

function initializeAnalyticsCharts() {
    // Revenue Analysis Chart
    const revenueAnalysisCtx = document.getElementById('revenueAnalysisChart');
    if (revenueAnalysisCtx && !charts.revenueAnalysis) {
        charts.revenueAnalysis = new Chart(revenueAnalysisCtx, {
            type: 'bar',
            data: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025'],
                datasets: [{
                    label: 'Gross Revenue',
                    data: [8500, 9200, 8800, 9500, 9800, 10200, 10500],
                    backgroundColor: '#1890ff'
                }, {
                    label: 'Net Revenue',
                    data: [6375, 6900, 6600, 7125, 7350, 7650, 7875],
                    backgroundColor: '#52c41a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    // Customer Segmentation Chart
    const customerSegCtx = document.getElementById('customerSegmentationChart');
    if (customerSegCtx && !charts.customerSegmentation) {
        charts.customerSegmentation = new Chart(customerSegCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'High Value',
                    data: [
                        {x: 120, y: 95},
                        {x: 150, y: 88},
                        {x: 180, y: 92},
                        {x: 200, y: 85}
                    ],
                    backgroundColor: '#52c41a'
                }, {
                    label: 'Medium Value',
                    data: [
                        {x: 80, y: 75},
                        {x: 90, y: 82},
                        {x: 110, y: 78},
                        {x: 95, y: 85}
                    ],
                    backgroundColor: '#faad14'
                }, {
                    label: 'Low Value',
                    data: [
                        {x: 40, y: 45},
                        {x: 60, y: 55},
                        {x: 50, y: 50},
                        {x: 70, y: 60}
                    ],
                    backgroundColor: '#ff4d4f'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Purchase Volume (Units)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Discount Rate (%)'
                        }
                    }
                }
            }
        });
    }

    // Forecasting Chart
    const forecastingCtx = document.getElementById('forecastingChart');
    if (forecastingCtx && !charts.forecasting) {
        charts.forecasting = new Chart(forecastingCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Historical Revenue',
                    data: [null, null, null, null, null, null, null, null, null, 3200, null, null],
                    borderColor: '#1890ff',
                    backgroundColor: 'rgba(24, 144, 255, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Forecasted Revenue',
                    data: [null, null, null, null, null, null, null, null, null, 3200, 3400, 3600],
                    borderColor: '#52c41a',
                    backgroundColor: 'rgba(82, 196, 26, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'M';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show login page by default
    showLogin();
    
    // Initialize ROI calculator
    calculateROI();
});
