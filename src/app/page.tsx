'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  Heading,
  SimpleGrid,
  Grid,
  GridItem,
  VStack,
  HStack,
  Input,
  Icon,
  Field,
  createListCollection,
  Portal,
  Select,
} from '@chakra-ui/react';
import { FiCalendar, FiMapPin, FiAward, FiCheckCircle, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { toaster } from "@/components/ui/toaster";

export default function HackathonLandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Hydration error එක මඟහරවා ගන්න flag එකක්
  const [isMounted, setIsMounted] = useState(false);

  // Countdown Timer States
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    setIsMounted(true);
    
    // Target fixed countdown simulation (8 days from current context)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 8);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    return () => clearInterval(timer);
  }, []);

  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institute: '',
    whatsapp: '',
    experience: 'Beginner',
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toaster.create({
      title: 'Registration Submitted!',
      description: `Thank you ${formData.fullName}, your spot for HackFlow 2026 has been secured successfully.`,
      type: 'success',
      duration: 5000
    });
  };

  const currentBg = isDarkMode ? "brand.bg" : "gray.50";
  const currentTextColor = isDarkMode ? "brand.onSurface" : "gray.900";
  const glassBg = isDarkMode ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)";
  const glassBorder = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  const glassPanelStyles = {
    bg: glassBg,
    backdropFilter: 'blur(12px)',
    border: `1px solid ${glassBorder}`,
    borderRadius: '2xl',
    p: { base: '6', md: '8' },
  };

  const experienceLevels = createListCollection({
    items: [
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Pro", value: "Pro" },
    ],
  });

  return (
    <Box bg={currentBg} color={currentTextColor} minH="100vh" position="relative" transition="background 0.3s, color 0.3s">
      
      {/* --- TOP RESPONSIVE NAVBAR --- */}
      <Box
        as="nav"
        position="fixed"
        top="0"
        w="full"
        zIndex="50"
        bg={isDarkMode ? "rgba(12, 19, 36, 0.85)" : "rgba(255, 255, 255, 0.85)"}
        backdropFilter="blur(20px)"
        borderBottom={`1px solid ${glassBorder}`}
        boxShadow={isDarkMode ? "0 0 20px rgba(76, 215, 246, 0.15)" : "0 2px 10px rgba(0,0,0,0.05)"}
        h="20"
      >
        <Flex justify="between" align="center" maxW="1440px" mx="auto" px="6" h="full">
          <Text fontSize="24px" fontWeight="900" letterSpacing="tighter" color="brand.primary">
            HACKFLOW
          </Text>

          {/* Desktop Links */}
          <HStack gap="8" display={{ base: 'none', md: 'flex' }}>
            <Link href="#" color="brand.primary" fontWeight="bold" fontFamily="mono" fontSize="14px">Home</Link>
            <Link href="#guidelines" color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"} fontWeight="medium" fontFamily="mono" fontSize="14px" _hover={{ color: 'brand.primary' }}>Guidelines</Link>
            <Link href="#schedule" color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"} fontWeight="medium" fontFamily="mono" fontSize="14px" _hover={{ color: 'brand.primary' }}>Schedule</Link>
            <Link href="#register" color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"} fontWeight="medium" fontFamily="mono" fontSize="14px" _hover={{ color: 'brand.primary' }}>Register</Link>
          </HStack>

          {/* Right Action Menu */}
          <HStack gap="4">
            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              variant="ghost"
              borderRadius="full"
              w="10"
              h="10"
              bg={isDarkMode ? "whiteAlpha.100" : "blackAlpha.100"}
              _hover={{ transform: "scale(1.1)" }}
            >
              <Icon as={isDarkMode ? FiSun : FiMoon} color={isDarkMode ? "yellow.400" : "purple.600"} w="5" h="5" />
            </Button>

            <Button
              display={{ base: 'none', sm: 'inline-flex' }}
              bg="brand.primaryContainer"
              color="brand.onPrimaryContainer"
              borderRadius="full"
              px="5"
              fontSize="12px"
              fontWeight="bold"
              fontFamily="mono"
              onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
            >
              JOIN NOW
            </Button>

            {/* Mobile Menu Icon Toggle */}
            <Button
              display={{ base: 'flex', md: 'none' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              w="10"
              h="10"
            >
              <Icon as={isMobileMenuOpen ? FiX : FiMenu} w="6" h="6" />
            </Button>
          </HStack>
        </Flex>

        {/* Mobile Dropdown Menu Container */}
        {isMobileMenuOpen && (
          <Box display={{ md: 'none' }} bg={isDarkMode ? "brand.surfaceLow" : "white"} borderBottom={`1px solid ${glassBorder}`} px="6" py="4" position="absolute" top="20" left="0" w="full" zIndex="45">
            <VStack gap="4" align="stretch">
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} py="2">Home</Link>
              <Link href="#guidelines" onClick={() => setIsMobileMenuOpen(false)} py="2">Guidelines</Link>
              <Link href="#schedule" onClick={() => setIsMobileMenuOpen(false)} py="2">Schedule</Link>
              <Link href="#register" onClick={() => setIsMobileMenuOpen(false)} py="2">Register</Link>
              <Button
                bg="brand.primaryContainer"
                color="brand.onPrimaryContainer"
                w="full"
                onClick={() => { setIsMobileMenuOpen(false); document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                JOIN NOW
              </Button>
            </VStack>
          </Box>
        )}
      </Box>

      {/* --- MAIN CONTENT AREA --- */}
      <Box as="main" pt="20">
        
        {/* Hero Section */}
        <Flex position="relative" minH="85vh" align="center" justify="center" overflow="hidden" px="6">
          {isDarkMode && <Box className="grid-overlay" position="absolute" inset="0" zIndex="1" pointerEvents="none" />}
          <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" w="800px" h="800px" bg="rgba(76, 215, 246, 0.06)" filter="blur(120px)" borderRadius="full" zIndex="0" />
          
          <VStack gap="10" maxW="4xl" textAlign="center" zIndex="10">
            <VStack gap="4">
              <Text fontFamily="mono" fontSize="12px" fontWeight="700" letterSpacing="widest" color="brand.primary" bg="rgba(76, 215, 246, 0.1)" px="4" py="1" borderRadius="full">
                2026 VIRTUAL HACKATHON
              </Text>
              <Heading as="h1" fontSize={{ base: '36px', sm: '48px', md: '64px' }} fontWeight="900" letterSpacing="-0.04em" lineHeight="1.1">
                Design Tomorrow:<br />
                <Text as="span" bgGradient="linear(to-r, brand.primary, brand.secondary)" bgClip="text">
                  Canvas of Flows
                </Text>
              </Heading>
            </VStack>

            {/* Countdown Widgets - Hydration Fixed via conditional render */}
            <SimpleGrid columns={{ base: 2, sm: 4 }} gap="4" w="full" maxW="lg" mx="auto">
              <VStack {...glassPanelStyles} p="4" gap="1">
                <Text fontSize={{ base: "30px", md: "40px" }} fontWeight="700" color="brand.primary">{isMounted ? timeLeft.days : "00"}</Text>
                <Text fontSize="10px" fontFamily="mono" opacity="0.6">DAYS</Text>
              </VStack>
              <VStack {...glassPanelStyles} p="4" gap="1">
                <Text fontSize={{ base: "30px", md: "40px" }} fontWeight="700" color="brand.primary">{isMounted ? timeLeft.hours : "00"}</Text>
                <Text fontSize="10px" fontFamily="mono" opacity="0.6">HOURS</Text>
              </VStack>
              <VStack {...glassPanelStyles} p="4" gap="1">
                <Text fontSize={{ base: "30px", md: "40px" }} fontWeight="700" color="brand.primary">{isMounted ? timeLeft.minutes : "00"}</Text>
                <Text fontSize="10px" fontFamily="mono" opacity="0.6">MINUTES</Text>
              </VStack>
              <VStack {...glassPanelStyles} p="4" gap="1" border="1px solid rgba(76, 215, 246, 0.4)" boxShadow="0 0 15px rgba(76, 215, 246, 0.15)">
                <Text fontSize={{ base: "30px", md: "40px" }} fontWeight="700" bgGradient="linear(to-r, brand.primary, brand.secondary)" bgClip="text">
                  {isMounted ? timeLeft.seconds : "00"}
                </Text>
                <Text fontSize="10px" fontFamily="mono" color="brand.primary" fontWeight="bold">SECONDS</Text>
              </VStack>
            </SimpleGrid>

            <Flex flexDir={{ base: 'column', sm: 'row' }} gap="4" w="full" justify="center" pt="4">
              <Button
                size="lg"
                bg="brand.primaryContainer"
                color="brand.onPrimaryContainer"
                borderRadius="full"
                px="10"
                fontSize="12px"
                boxShadow="0 0 30px rgba(6, 182, 212, 0.3)"
                _hover={{ boxShadow: '0 0 50px rgba(6, 182, 212, 0.5)' }}
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
              >
                REGISTER NOW
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor={isDarkMode ? "whiteAlpha.300" : "blackAlpha.300"}
                borderRadius="full"
                px="10"
                fontSize="12px"
                _hover={{ borderColor: 'brand.primary' }}
                onClick={() => document.getElementById('guidelines')?.scrollIntoView({ behavior: 'smooth' })}
              >
                VIEW GUIDELINES
              </Button>
            </Flex>
          </VStack>
        </Flex>

        {/* Bento Grid Event Overview */}
        <Box py="20" px="6" maxW="1440px" mx="auto" id="guidelines">
          <Box mb="10">
            <Heading as="h2" fontSize="40px" mb="2">Event Overview</Heading>
            <Box w="20" h="1" bg="brand.primary" borderRadius="full" />
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap="6">
            <GridItem colSpan={{ base: 1, md: 2 }} {...glassPanelStyles} display="flex" flexDir="column" style={{ justifyContent: 'space-between' }} gap="6" _hover={{ borderColor: 'rgba(76, 215, 246, 0.3)' }} transition="all 0.3s">
              <Icon as={FiCalendar} color="brand.primary" w="10" h="10" />
              <VStack align="start" gap="2">
                <Heading as="h3" fontSize="24px">Schedule & Logistics</Heading>
                <Text color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"}>Sprint starts soon. A 48-hour virtual breakdown of front-end UI creativity synced directly into functional state cycles.</Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1} {...glassPanelStyles} display="flex" flexDir="column" gap="4">
              <HStack gap="4">
                <Flex w="12" h="12" bg={isDarkMode ? "brand.surfaceHigh" : "gray.200"} borderRadius="xl" align="center" justify="center">
                  <Icon as={FiMapPin} color="brand.secondary" w="6" h="6" />
                </Flex>
              </HStack>
              <Text fontFamily="mono" fontSize="12px" fontWeight="bold">Platform</Text>
              <Text color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"}>Seamlessly blend Canva visual assets with Google Flow architecture logic systems.</Text>
            </GridItem>

            <GridItem colSpan={1} rowSpan={{ base: 1, md: 2 }} className="glow-border" borderRadius="2xl" overflow="hidden">
              <Flex {...glassPanelStyles} h="full" w="full" flexDir="column" align="center" justify="center" textAlign="center" gap="4">
                <Icon as={FiAward} color="yellow.400" w="14" h="14" mb="4" />
                <Box>
                  <Text fontFamily="mono" fontSize="12px" color="brand.primary" letterSpacing="widest">TOTAL REWARDS</Text>
                  <Text fontSize="48px" fontWeight="900" bgGradient="linear(to-br, brand.primary, brand.secondary)" bgClip="text">$15,000</Text>
                </Box>
                <Text color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"} fontSize="sm" mt="2">Distributed among Top Innovators and Category Winners.</Text>
              </Flex>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }} {...glassPanelStyles}>
              <SimpleGrid columns={2} gap="6">
                <Box>
                  <Text fontSize="24px" fontWeight="bold" color="brand.primary">500+</Text>
                  <Text fontSize="12px" opacity="0.6" fontFamily="mono">DESIGNERS</Text>
                </Box>
                <Box>
                  <Text fontSize="24px" fontWeight="bold" color="brand.secondary">24h</Text>
                  <Text fontSize="12px" opacity="0.6" fontFamily="mono">MENTOR SUPPORT</Text>
                </Box>
                <Box>
                  <Text fontSize="24px" fontWeight="bold" color="brand.primary">12</Text>
                  <Text fontSize="12px" opacity="0.6" fontFamily="mono">INDUSTRY JUDGES</Text>
                </Box>
                <Box>
                  <Text fontSize="24px" fontWeight="bold" color="brand.secondary">VIRTUAL</Text>
                  <Text fontSize="12px" opacity="0.6" fontFamily="mono">GLOBAL ACCESS</Text>
                </Box>
              </SimpleGrid>
            </GridItem>

            <GridItem colSpan={1} {...glassPanelStyles} display="flex" flexDir="column" style={{justifyContent:'end'}} bgGradient="linear(to-br, rgba(76,215,246,0.05), transparent)">
              <Text fontFamily="mono" fontSize="12px" color="brand.primary" mb="2">// CORE TRACKS</Text>
              <Text fontSize="24px" fontWeight="semibold" lineHeight="tight">UI Evolution &<br />System Flows</Text>
            </GridItem>
          </Grid>
        </Box>

        {/* Challenge Description & Workflow Timeline */}
        <Box py="20" bg={isDarkMode ? "rgba(7, 13, 31, 0.5)" : "gray.100"}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="16" maxW="1440px" mx="auto" px="6" alignItems="center">
            <VStack align="start" gap="6">
              <VStack align="start" gap="2">
                <Text fontFamily="mono" fontSize="12px" color="brand.secondary" letterSpacing="widest">THE CHALLENGE</Text>
                <Heading as="h2" fontSize="40px">Where Aesthetics Meets Logic</Heading>
              </VStack>
              <Text fontSize="18px" color={isDarkMode ? "brand.onSurfaceVariant" : "gray.700"}>
                HackFlow asks you to bridge the gap between static canvas beauty and functional flow architecture. Using <Text as="span" color="brand.primary" fontWeight="bold">Canva's</Text> library, you'll build responsive UI interfaces that execute complex data states mapped on <Text as="span" color="brand.secondary" fontWeight="bold">Google Flow</Text>.
              </Text>
              <HStack gap="6" pt="2">
                <HStack><Icon as={FiCheckCircle} color="brand.primary" /><Text fontFamily="mono" fontSize="14px">Asset Fidelity</Text></HStack>
                <HStack><Icon as={FiCheckCircle} color="brand.secondary" /><Text fontFamily="mono" fontSize="14px">Logic Integrity</Text></HStack>
              </HStack>
            </VStack>

            <VStack position="relative" pl="8" align="start" gap="10" id="schedule">
              <Box position="absolute" left="0" top="0" bottom="0" w="1" bgGradient="linear(to-b, brand.primary, brand.secondary, transparent)" opacity="0.3" />
              
              <Box position="relative">
                <Box position="absolute" left="-38px" top="1" w="4" h="4" bg="brand.primary" borderRadius="full" border="4px solid #0c1324" />
                <Text fontSize="12px" fontFamily="mono" color="brand.primary">OCTOBER 15</Text>
                <Heading as="h4" fontSize="24px">Submission Opens</Heading>
                <Text color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"}>Portals open for initial design system submission.</Text>
              </Box>

              <Box position="relative">
                <Box position="absolute" left="-38px" top="1" w="4" h="4" bg="brand.secondary" borderRadius="full" border="4px solid #0c1324" />
                <Text fontSize="12px" fontFamily="mono" color="brand.secondary">OCTOBER 24</Text>
                <Heading as="h4" fontSize="24px">Flow Workshop</Heading>
                <Text color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"}>Exclusive strategy workflow sync hosted by expert design leads.</Text>
              </Box>

              <Box position="relative">
                <Box position="absolute" left="-38px" top="1" w="4" h="4" bg="brand.primary" borderRadius="full" border="4px solid #0c1324" />
                <Text fontSize="12px" fontFamily="mono" color="brand.primary">OCTOBER 26</Text>
                <Heading as="h4" fontSize="24px">Final Review</Heading>
                <Text color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"}>Submissions lock up. Live interactive jury evaluation kicks off.</Text>
              </Box>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Dynamic Registration Form */}
        <Box py="20" px="6" position="relative" id="register">
          <Box maxW="2xl" mx="auto">
            <Box {...glassPanelStyles} p={{ base: '8', md: '12' }} boxShadow="0 30px 60px -12px rgba(0,0,0,0.5)">
              <VStack gap="2" textAlign="center" mb="8">
                <Heading as="h2" fontSize="40px">Secure Your Spot</Heading>
                <Text color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"}>Lock in your dashboard registration. Join top technical universities.</Text>
              </VStack>

              <form onSubmit={handleRegisterSubmit}>
                <VStack gap="5" align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="5" w="full">
                    <Field.Root required>
                      <Field.Label fontSize="12px" fontFamily="mono" opacity="0.6">FULL NAME</Field.Label>
                      <Input
                        bg={isDarkMode ? "brand.surface" : "white"}
                        border="1px solid rgba(255,255,255,0.1)"
                        color={isDarkMode ? "white" : "black"}
                        borderRadius="xl"
                        py="6"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        _focus={{ borderColor: 'brand.primary' }}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label fontSize="12px" fontFamily="mono" opacity="0.6">EMAIL ADDRESS</Field.Label>
                      <Input
                        type="email"
                        bg={isDarkMode ? "brand.surface" : "white"}
                        border="1px solid rgba(255,255,255,0.1)"
                        color={isDarkMode ? "white" : "black"}
                        borderRadius="xl"
                        py="6"
                        placeholder="john@university.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        _focus={{ borderColor: 'brand.primary' }}
                      />
                    </Field.Root>
                  </SimpleGrid>

                  <Field.Root required>
                    <Field.Label fontSize="12px" fontFamily="mono" opacity="0.6">UNIVERSITY / INSTITUTE</Field.Label>
                    <Input
                      bg={isDarkMode ? "brand.surface" : "white"}
                      border="1px solid rgba(255,255,255,0.1)"
                      color={isDarkMode ? "white" : "black"}
                      borderRadius="xl"
                      py="6"
                      placeholder="ESOFT Metro College - Monaragala"
                      value={formData.institute}
                      onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                      _focus={{ borderColor: 'brand.primary' }}
                    />
                  </Field.Root>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="5" w="full">
                    <Field.Root required>
                      <Field.Label fontSize="12px" fontFamily="mono" opacity="0.6">WHATSAPP NUMBER</Field.Label>
                      <Input
                        bg={isDarkMode ? "brand.surface" : "white"}
                        border="1px solid rgba(255,255,255,0.1)"
                        color={isDarkMode ? "white" : "black"}
                        borderRadius="xl"
                        py="6"
                        placeholder="+94 7X XXX XXXX"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        _focus={{ borderColor: 'brand.primary' }}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label fontSize="12px" fontFamily="mono" opacity="0.6">EXPERIENCE LEVEL</Field.Label>
                      <Select.Root 
                        collection={experienceLevels} 
                        size="md"
                        value={[formData.experience]}
                        onValueChange={(details) => {
                          if (details.value.length > 0) {
                            setFormData({ ...formData, experience: details.value[0] });
                          }
                        }}
                      >
                        <Select.HiddenSelect name="experience" />
                        <Select.Control>
                          <Select.Trigger 
                            bg={isDarkMode ? "brand.surface" : "white"}
                            border="1px solid rgba(255,255,255,0.1)"
                            color={isDarkMode ? "white" : "black"}
                            borderRadius="xl"
                            h="50px"
                            px="4"
                            _focus={{ borderColor: 'brand.primary' }}
                          >
                            <Select.ValueText placeholder="Select Experience Level" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator color="brand.onSurfaceVariant" />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner zIndex="60">
                            <Select.Content bg={isDarkMode ? "brand.surfaceLow" : "white"} borderColor="whiteAlpha.200" borderRadius="xl">
                              {experienceLevels.items.map((level) => (
                                <Select.Item 
                                  item={level} 
                                  key={level.value}
                                  color={isDarkMode ? "white" : "black"}
                                  _hover={{ bg: "brand.primaryContainer", color: "white" }}
                                  cursor="pointer"
                                  p="3"
                                  borderRadius="lg"
                                >
                                  {level.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </Field.Root>
                  </SimpleGrid>

                  <Button
                    type="submit"
                    w="full"
                    py="7"
                    mt="4"
                    bg="brand.primary"
                    color="black"
                    fontWeight="bold"
                    fontFamily="mono"
                    fontSize="12px"
                    borderRadius="xl"
                    _hover={{ boxShadow: '0 0 30px rgba(76, 215, 246, 0.4)', filter: 'brightness(1.1)' }}
                  >
                    SUBMIT REGISTRATION
                  </Button>
                </VStack>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box as="footer" bg={isDarkMode ? "brand.surfaceLow" : "gray.200"} borderTop={`1px solid ${glassBorder}`} py="8" w="full">
        <Flex flexDir={{ base: 'column', md: 'row' }} justify="between" align="center" maxW="1440px" mx="auto" px="6" gap="4">
          <Text fontSize="20px" fontWeight="900" color="brand.primary">HACKFLOW</Text>
          <HStack gap="6">
            <Link fontSize="12px" fontFamily="mono" color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"} _hover={{ color: 'brand.primaryContainer' }}>Terms</Link>
            <Link fontSize="12px" fontFamily="mono" color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"} _hover={{ color: 'brand.primaryContainer' }}>Privacy</Link>
            <Link fontSize="12px" fontFamily="mono" color={isDarkMode ? "brand.onSurfaceVariant" : "gray.600"} _hover={{ color: 'brand.primaryContainer' }}>Discord</Link>
          </HStack>
          <Text fontSize="12px" fontFamily="mono" opacity="0.6">© 2026 HACKFLOW HACKATHON. ALL RIGHTS RESERVED.</Text>
        </Flex>
      </Box>
    </Box>
  );
}